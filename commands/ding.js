module.exports = {
    name: 'Ding',
    command: 'ding',
    description: "Sends a dong back. Like ping, except ding!.",
    usage: '`ding`',
    execute(message, args) {
        message.channel.send('dong!');
    }
}