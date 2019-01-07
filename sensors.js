const argv = require('minimist')(process.argv.slice(2))
if (argv.h) {
    console.log("node sensors.js ip_address")
    process.exit()
}
console.log(argv._[0])
const mqtt = require('mqtt')
const url = require('url')
const readline = require('readline')
const mqtt_url = url.parse('mqtt://guest:guest@' + argv._[0] + ':1883')
const auth = (mqtt_url.auth || ':').split(':')

readline.emitKeypressEvents(process.stdin)
process.stdin.setRawMode(true)

const options = {
    port: mqtt_url.port,
    clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
    username: auth[0],
    password: auth[1],
}

function send_message(message) {
    console.log("Sent", message)
    const client = mqtt.connect("mqtt://" + mqtt_url.host, options)
    client.on('connect', function () {
        client.publish("babycare/childseat", JSON.stringify(message), function () {
            client.end();
        });
    });
}

let door_lock = false
let seat_occupy = false
let warning = false
process.stdin.on('keypress', (str, key) => {

    if (key.ctrl && key.name === 'c')
        process.exit()
    else if (key.name === "space") {
        door_lock = !door_lock
        console.log("door is ", door_lock ? "close" : "open")
    }
    else if (key.name === "p") {
        seat_occupy = !seat_occupy
        console.log("seat is ", seat_occupy ? "occupy" : "free")
    }
    if (door_lock && seat_occupy) {
        warning = true;
        send_message({ warning: warning })
    }
    if (!door_lock && warning) {
        warning = false
        send_message({ warning: warning })
    }
})