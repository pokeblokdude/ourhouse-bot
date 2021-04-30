module.exports = {
    name: 'Join Weekly',
    command: 'joinweekly',
    description: "Sends a pong back. Used to test whether the bot is working.",
    category: "loft",
    usage: '`loft joinweekly`',
    execute(message, args) {
        message.channel.send('pong!');
    }
}