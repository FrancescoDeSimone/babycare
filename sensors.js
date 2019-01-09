const argv = require('minimist')(process.argv.slice(2))
const mqtt = require("./mqttservice")
const readline = require('readline')

let door_lock = false
let seat_occupy = false
let warning = false

readline.emitKeypressEvents(process.stdin)
process.stdin.setRawMode(true)

if (argv.h || argv._.length === 0) {
    console.log("node sensors.js [ip_address]")
    process.exit()
}


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
        warning = true
        mqtt.send_message(argv._[0], { warning: true }, "babycare/childseat")
    }
    if (warning && !door_lock) {
        warning = false
        mqtt.send_message(argv._[0], { warning: false }, "babycare/childseat")
    }
})
