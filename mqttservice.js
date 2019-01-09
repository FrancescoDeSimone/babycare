exports.send_message = (ip, message, topic) => {
    const mqtt = require('async-mqtt')
    const url = require('url')
    const mqtt_url = url.parse('mqtt://guest:guest@' + ip + ':1883')
    const auth = (mqtt_url.auth || ':').split(':')
    const options = {
        port: mqtt_url.port,
        clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
        username: auth[0],
        password: auth[1],
    }
    const client = mqtt.connect("mqtt://" + mqtt_url.host, options)
    client.on("connect", async function () {
        try {
            await client.publish(topic, JSON.stringify(message));
            await client.end();
            console.log("Sent", message, "to", topic)
        } catch (e) {
            console.log(e.stack);
            process.exit();
        }
    });
};