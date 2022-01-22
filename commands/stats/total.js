module.exports = {
  name: 'Total',
  command: 'total',
  description: "Shows how many messages have been sent by each user.",
  category: "stats",
  usage: '`stats total [self/channel]`',
  execute(message, args) {
      message.channel.send('pong!');
  }
}