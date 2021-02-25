module.exports = {
    name: 'Ding',
    command: 'ding',
    description: "Sends a dong back!.",
    category: "general",
    usage: '`ding`',
    execute(message, args) {
        message.channel.send('dong!');
    }
}