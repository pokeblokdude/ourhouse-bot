module.exports = {
    name: 'Ping',
    command: 'ping',
    description: "Sends a pong back. Used to test whether the bot is working.",
    category: "testing",
    usage: '`ping`',
    execute(message, args) {
        message.channel.send('pong!');
    }
}