const { HLTV } = require('hltv');
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: 'HLTV',
  command: 'hltv',
  description: "Sends a list of the current top 15 CS:GO teams, as ranked by HLTV",
  category: "general",
  usage: '`hltv`',
  async execute(message, args) {
      const ranking = await HLTV.getTeamRanking();

      let str = '';
      for(let i = 0; i < 15; i++) {
        let change = ranking[i].change
        str = str.concat(`**${i+1}. ${ranking[i].team.name}** ${change>0 ? '+' : ''}${change === 0 ? '' : '*'+change+'*'} ${change === 0 ? '' : change>0 ? '⬆' : '⬇'}\n*(${ranking[i].points})*\n`);
      }

      let embed = new MessageEmbed()
        .setTitle(`HLTV World Ranking`)
        .setURL(`https://www.hltv.org/ranking/teams/`)
        .setThumbnail('https://scontent-bos3-1.xx.fbcdn.net/v/t1.18169-9/14095756_10153930815514010_7796113555609445472_n.png?_nc_cat=111&ccb=1-6&_nc_sid=09cbfe&_nc_ohc=dJcybwmuC0cAX_iNPy-&_nc_ht=scontent-bos3-1.xx&oh=00_AT8UTpbQIaBmdjFJ5S3-qq_vIr-_rgzYS-8pnz0PObrREQ&oe=629C9677')
        .setDescription(str)
        .setFooter(`Requested by: ${(message.member.nickname || message.author.username)}`, message.author.displayAvatarURL())
        .setTimestamp()
      ;

      message.channel.send(embed);
  }
}