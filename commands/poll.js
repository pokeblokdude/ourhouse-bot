const fs = require('fs');
const { MessageEmbed } = require("discord.js");
const parser = require('./../modules/command-parser.js')

module.exports = {
    name: '[LOCKED] Poll',
    command: 'poll',
    description: "Stars a poll using command arguments, up to a maximum of 6 voting options. Poll lasts indefinitely unless a duration is specified. Currently only supports 1 active poll per channel.",
    usage: '`poll {duration (seconds)} "[title]" "[option 1]"..."[option 6]"`',
    execute(message, args) {
        if(args.length < 2) {
            message.channel.send(`Usage: ${this.usage}`);
            return;
        }
        //               Engineer' (Our House) = 784934880433143809, "Admin" (Bot Testing) = 735229898871799971
        if(message.member.roles.cache.find(r => r.id === '784934880433143809' || '735229898871799971')) {
            let duration = isNaN(Number(args[0])) ? undefined : args.shift();
            // Turn [word, word, word, ... word] (array of words) into [arg1, arg2, ... argn] (array of arguments)
            const pollargs = parser.parseStrings(args);
            console.log(pollargs);

            // Check if the command had valid syntax
            if(!pollargs.validsyntax) {
                message.channel.send(`Usage: ${this.usage}`);
                return;
            }
            if(pollargs.data.length > 7) {
                message.channel.send('Please provide 6 or fewer voting options.');
                return;
            }
            
            // Actual data from the polls.json file
            let polljson = JSON.parse(fs.readFileSync('./data/polls.json'));
            if(JSON.parse(polljson.hasOwnProperty(message.channel.id))){
                message.channel.send('This channel already has an active poll!');
                return;
            }

            let polldata = {
                title: pollargs.data.shift(),
                timestamp: Date.now(),
                duration: duration
            };
            for(let i = 0; i < pollargs.data.length; i++) {
                Object.defineProperty(polldata, i, {
                    value: {
                        name: pollargs.data[i],
                        text: "",
                        percentage: 0,
                        votes: 0
                    },
                    writable: true,
                    configurable: true,
                    enumerable: true
                });
            }

            Object.defineProperty(polljson, message.channel.id, {
                value: polldata,
                writable: true,
                configurable: true,
                enumerable: true
            });
            Object.defineProperty(polljson, "empty", {
                value: false,
                writable: true,
                configurable: true,
                enumerable: true
            });
            
            
            const embed = new MessageEmbed()
                .setAuthor((message.member.nickname || message.author.username), message.author.displayAvatarURL())
                .setTitle(polldata.title)
                .setDescription();
            message.channel.send(embed)
                .then(msg => {
                    Object.defineProperty(polljson[message.channel.id], "messageid", { value: msg.id, writable: true, configurable: true, enumerable: true });
                    fs.writeFile('./data/polls.json', JSON.stringify(polljson, null, 4), (err) => { if(err) { throw err; } });
                });
            
        }
        else {
            message.channel.send("Insufficient permissions.")
        }
    }
}