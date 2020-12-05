module.exports = {
    name: 'setprefix',
    description: "ping-pong command",
    execute(message, args) {
        if(message.member.roles.cache.has('735229898871799971')){
            message.channel.send('pong!');
        }
        else {
            message.channel.send('Insufficient Permissions');
        }
    }
}