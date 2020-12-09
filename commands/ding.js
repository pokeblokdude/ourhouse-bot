module.exports = {
    name: 'Ding',
    command: 'ding',
    description: "Sends a dong back!.",
    usage: '`ding`',
    execute(message, args) {
        message.channel.send('dong!');
    }
}