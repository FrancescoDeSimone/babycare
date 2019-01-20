const argv = require('minimist')(process.argv.slice(2))
const mqtt = require("./mqttservice")

if (argv.h || argv._.length === 0) {
    console.log("node smart_watch.js [ip_address]")
    process.exit()
}

setInterval(() => {
    const hearth = Math.random() * 40 + 50
    const temp = Math.random() * 4 + 36
    mqtt.send_message(argv._[0], { warning: temp >= 37 || hearth <= 60, hearth: hearth, temp: temp }, "babycare/health")
}, 5000);

