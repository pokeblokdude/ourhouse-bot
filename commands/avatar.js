module.exports = {
    name: 'Avatar',
    command: 'avatar',
    description: "Sends you a link to either your own or a specified user's profile picture.",
    category: "general",
    usage: '`avatar {user}`',
    execute(message, args) {
        if(!args.length) {
            message.channel.send(`Here's a link to <@!${message.author.id}>'s profile picture: ${message.author.displayAvatarURL({dynamic: true})}`);
            message.delete();
            return;
        }
        else if(args.length === 1) {
            if(Number.isNaN(Number(args[0].slice(3, args[0].length-1)))) {
                message.channel.send(`Usage: ${this.usage}`);
                return;
            }

            let guildMember = message.channel.members.get(args[0].slice(3, args[0].length-1));
            if(!guildMember) {
                message.channel.send("User not found.");
                return;
            }
            let user = guildMember.user;
            message.channel.send(`Here's a link to <@!${user.id}>'s profile picture: ${user.displayAvatarURL({dynamic: true})}`);
            message.delete();
            return;
        }
        else {
            message.channel.send(`Usage: ${this.usage}`);
        }
    }
}