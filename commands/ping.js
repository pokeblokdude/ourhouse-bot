module.exports = {
    name: 'Ping',
    command: 'ping',
    description: "Sends a pong back. Used to test whether the bot is working.",
    usage: '`ping`',
    execute(message, args) {
        if(message.member.roles.cache.has('735229898871799971')){
            message.channel.send('pong!');
        }
        else {
            message.channel.send('Insufficient Permissions');
        }
    }
}