var amqp = require('amqplib/callback_api');

var args = process.argv.slice(2);

if (args.length == 0) {
  console.log("Usage: receive_logs_direct.js [childseat] [health] [position]");
  process.exit(1);
}

amqp.connect('amqp://guest:guest@192.168.1.111:5672', function(err, conn) {
  conn.createChannel(function(err, ch) {
    var ex = 'babycare/logger';
    ch.assertExchange(ex, 'direct', {durable: false});
    ch.assertQueue('', {exclusive: true}, function(err, q) {
      console.log(' [*] Waiting for logs. To exit press CTRL+C');

      args.forEach(function(severity) {
        ch.bindQueue(q.queue, ex, severity);
      });

      ch.consume(q.queue, function(msg) {
        console.log(" [x] %s: '%s'", msg.fields.routingKey, msg.content.toString());
      }, {noAck: true});
    });
  });
});