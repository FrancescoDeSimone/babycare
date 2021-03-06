const amqp = require('amqplib');
const argv = require('minimist')(process.argv.slice(2))

if (argv.h || argv.ip === undefined || argv._.length === 0) {
    console.log("Usage: logger.js --ip [ip_address] [childseat] [health] [position] [topic] [IFTTT]");
    process.exit(1);
}
async function init() {
    const conn = await amqp.connect('amqp://guest:guest@' + argv.ip + ':5672')
    const channel = await conn.createChannel()
    await channel.assertExchange('babycare/logger', 'direct', { durable: false })
    const q = await channel.assertQueue('', { exclusive: true })
    argv._.forEach(async routing => {
        await channel.bindQueue(q.queue, 'babycare/logger', routing)
    });
    await channel.consume(q.queue, (msg) => console.log(" [" + new Date().toISOString() + "] %s: '%s'", msg.fields.routingKey, msg.content.toString()), { noAck: true });
}
init()
