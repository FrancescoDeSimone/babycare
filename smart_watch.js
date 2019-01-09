const argv = require('minimist')(process.argv.slice(2))
const mqtt = require("./mqttservice")

if (argv.h || argv._.length === 0) {
    console.log("node smart_watch.js [ip_address]")
    process.exit()
}

setInterval(() => {
    let hearth = Math.random() * 40 + 50
    let temp = Math.random() * 4 + 36
    if (temp >= 37 || hearth <= 60) {
        mqtt.send_message(argv._[0], { warning: true, hearth: hearth, temp: temp }, "babycare/health")
    } else {
        mqtt.send_message(argv._[0], { warning: false, hearth: hearth, temp: temp }, "babycare/health")
    }
}, 5000);

