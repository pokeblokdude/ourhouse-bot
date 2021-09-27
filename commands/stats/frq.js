module.exports = {
    name: 'Frequency',
    command: 'frq',
    description: "Shows how often you send messages.",
    category: "stats",
    usage: '`stats frq`',
    execute(message, args) {
        message.channel.send('pong!');
    }
}