module.exports = {
    name: 'Ding',
    command: 'ding',
    description: "Sends a dong back!.",
    category: "testing",
    usage: '`ding`',
    execute(message, args) {
        message.channel.send('dong!');
    }
}