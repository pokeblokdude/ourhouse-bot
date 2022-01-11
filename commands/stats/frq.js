const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'Frequency',
    command: 'frq',
    description: "Shows how often users send messages.",
    category: "stats",
    usage: '`stats frq {"channel"/"user"} {channelName/userName/"self"}`',
    execute(message, args) {
        if(!args.length) {
            const embed = new MessageEmbed()
                .setTitle('Our House Stats')
                .setColor('#59A833')
                .setDescription("**Total Message Frequency**");
            message.channel.send(embed);
            return;
        }
        else if(args.length === 1) {
            message.channel.send(`Usage: ${this.usage}`);
            return;
        }
        else if(args.length === 2) {
            const embed = new MessageEmbed()
                .setTitle('Our House Stats')
                .setColor('#59A833')
                .setDescription("**Frequency**");
            message.channel.send(embed);
            return;
        }
        else {
            message.channel.send(`Usage: ${this.usage}`);
            return;
        }

        const embed = new MessageEmbed()
            .setTitle('Example Embed')
            .setColor('00ff0d')
            .setDescription("WOW!");


    }
}