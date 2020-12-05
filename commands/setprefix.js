module.exports = {
    name: 'Set Prefix',
    command: 'setprefix',
    description: "Change the prefix used to write bot commands. '!' by default.",
    usage: "`setprefix [prefix]`",
    execute(message, args) {
        if(message.member.roles.cache.has('735229898871799971')){
            message.channel.send('pong!');
        }
        else {
            message.channel.send('Insufficient Permissions');
        }
    }
}