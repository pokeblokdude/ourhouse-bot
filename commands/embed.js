const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'Embed',
    command: 'embed',
    description: "Sends a sample embed.",
    usage: '`embed`',
    execute(message, args) {
        const embed = new MessageEmbed()
            .setTitle('Example Embed')
            .setColor('00ff0d')
            .setDescription("WOW!");
        message.channel.send(embed);
    }
}