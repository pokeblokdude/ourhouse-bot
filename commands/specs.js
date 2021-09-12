const mongoose = require('mongoose');
const PcSpecs = require('../model/pc-specs');

const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'Specs',
    command: 'specs',
    description: "Sends a list of your PC specs, or the specs of another user.",
    category: "general",
    usage: '`specs {user}`',
    async execute(message, args) {
        if(args.length > 1) {
            message.channel.send(`Usage: ${this.usage}`);
            return;
        }

        const userId = args.length ? args[0].substring(3, args[0].length-1) : message.author.id;
        const member = message.channel.members.get(userId);
        const avatarURL = member.user.displayAvatarURL();

        let obj = await PcSpecs.findOne({ userID: userId }).then(console.log('Read from database'));
        if(!obj) {
            message.channel.send('User has not set their specs. Use !setspecs to link a PCPartpicker list.');
            return;
        }
        
        // format specs
        let str = `**CPU**\n> ${obj.CPU}\n**Motherboard**\n> ${obj.Motherboard}\n**Memory**\n`;
        for(const mem in obj.memory) {
            str = str.concat("> " + (obj.memory[mem].length > 54 ? (obj.memory[mem].substring(0, obj.memory[mem].length - Math.abs(54-obj.memory[mem].length))) + "..." : obj.memory[mem]) + "\n");
        }
        str = str.concat(`**GPU**\n> ${obj["Video Card"]}\n**Storage**\n`);
        for(const st in obj.storage) {
            str = str.concat("> " + (obj.storage[st].length > 54 ? obj.storage[st].substring(0, obj.storage[st].length - Math.abs(54-obj.storage[st].length)) + "..." : obj.storage[st]) + "\n");
        }
        if(obj.Mouse) {
            str = str.concat(`**Mouse**\n> ${obj.Mouse}\n`);
        }
        if(obj.Keyboard) {
            str = str.concat(`**Keyboard**\n> ${obj.Keyboard}\n`);
        }
        if(obj.monitor) {
            str = str.concat('**' + 'Monitor' + (obj.monitor.length > 1 ? 's' : '') + '**\n')
            for(const mon in obj.monitor) {
                str = str.concat("> " + (obj.monitor[mon].length > 54 ? obj.monitor[mon].substring(0, obj.monitor[mon].length - Math.abs(54-obj.monitor[mon].length)) + "..." : obj.monitor[mon])+ "\n");
            }
        }

        // put specs into embed
        let embed = new MessageEmbed()
            .setAuthor((member.nickname || member.user.username), avatarURL)
            .setTitle(`PC Specs`)
            .setURL(`https://pcpartpicker.com/list/${obj.listID}`)
            .setThumbnail('https://b.kisscc0.com/20180705/tjq/kisscc0-integrated-circuits-chips-central-processing-uni-generic-chip-5b3e6d949b77d7.1828025815308179406368.png')
            .setDescription(str)
            .setFooter(`Requested by: ${(message.member.nickname || message.author.username)}`, message.author.displayAvatarURL());
        ;
        message.channel.send(embed);
        message.delete();
    }
}