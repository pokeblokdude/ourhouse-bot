module.exports = {
    name: 'Search',
    command: 'search',
    description: "Sends a pong back. Used to test whether the bot is working.",
    category: "loft",
    usage: '`loft search [track | album | artist] [search args]`',
    execute(message, args) {
        message.channel.send('pong!');
    }
}