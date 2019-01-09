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
        client.publish("babycare/health", JSON.stringify(message), function () {
            setTimeout(()=>client.end(),500);
        });
    	
    });
}


setInterval(()=>{
	let hearth=Math.random()*20+80
	let temp= Math.random()*4+36
	send_message({hearth:hearth,temp:temp})
	},5000);
