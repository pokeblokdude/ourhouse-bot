const { MessageEmbed } = require('discord.js');

module.exports = {
    name: '[LOCKED] Test',
    command: 'test',
    description: "Temporary command for testing random stuff.",
    usage: '`test`',
    execute(message, args) {
        let embed = new MessageEmbed()
            .setAuthor((message.member.nickname || message.author.username), message.author.displayAvatarURL())
            .setTitle('Test Poll')
            .setDescription(':one: Option 1\n:blue_square::blue_square::blue_square::blue_square::blue_square::blue_square::white_large_square::white_large_square::white_large_square::white_large_square:\n\n:two: Option 2\n:blue_square::blue_square::blue_square::blue_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square::white_large_square:')
            .setFooter('React to vote!');

        message.channel.send(embed).then(msg => message.channel.send("Poll message id: " + msg.id));
    }
}