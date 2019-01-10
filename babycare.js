var amqp = require('amqplib');

async function logger(msg, routing) {
    const conn = await amqp.connect('amqp://guest:guest@192.168.1.111:5672')
    const channel = await conn.createChannel()
    await channel.assertExchange('babycare/logger', 'direct', { durable: false })
    await channel.publish("babycare/logger", routing, new Buffer.from(msg))
    await channel.close()
    await conn.close()
}

exports.handler = function (context, event) {
    const _event = JSON.parse(JSON.stringify(event))
    const _data = String.fromCharCode(..._event.body.data)
    const routing = _event.url.split("/")[1]
    logger(_data, routing)
    logger(JSON.stringify(_event), "topic")
    context.callback("send " + _data + " in " + routing)
};
