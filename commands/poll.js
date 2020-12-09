const fs = require('fs');
const { MessageEmbed } = require("discord.js");
const parser = require('./../modules/command-parser.js')

const optionEmotes = {
    0: "1️⃣",
    1: "2️⃣",
    2: "3️⃣",
    3: "4️⃣",
    4: "5️⃣",
    5: "6️⃣"
};
// TODO: messages with completely random syntax crash the bot
module.exports = {
    name: '[LOCKED] Poll',
    command: 'poll',
    description: "Starts a poll using command arguments, up to a maximum of 6 voting options. Poll lasts indefinitely unless a duration is specified. Currently only supports 1 active poll per channel.",
    usage: '`poll {duration (seconds)} "[title]" "[option 1]"..."[option 6]"`',
    execute(message, args) {
        if(args.length < 2) {
            message.channel.send(`Usage: ${this.usage}`);
            return;
        }
        //               Engineer' (Our House) = 784934880433143809, "Admin" (Bot Testing) = 735229898871799971
        if(message.member.roles.cache.find(r => r.id === '784934880433143809' || '735229898871799971')) {
            // Check whether or not the first argument is a number. If so, remove it from the array and set it to 'duration'
            let duration = isNaN(Number(args[0])) ? undefined : args.shift();
            // Turn [word, word, word, ... word] (array of words) into [arg1, arg2, ... argn] (array of arguments)
            const pollargs = parser.parseStrings(args);

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
                duration: duration,
                timed: (duration !== undefined),
                totalVotes: 0
            };
            Object.defineProperty(polldata, "options", {
                value: [],
                writable: true,
                configurable: true,
                enumerable: true
            });
            for(let i = 0; i < pollargs.data.length; i++) {
                polldata.options.push({
                    name: pollargs.data[i],
                    bar: "",
                    percentage: 0,
                    votes: 0,
                    reaction: optionEmotes[i]
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
                .setFooter('React to vote!');
            message.channel.send(embed)
                .then(msg => {
                    for(let i = 0; i < polldata.options.length; i++) {
                        msg.react(optionEmotes[i]);
                    }
                    Object.defineProperty(polljson[message.channel.id], "messageid", { 
                        value: msg.id, 
                        writable: true, 
                        configurable: true, 
                        enumerable: true 
                    });
                    console.log(`Created poll:`);
                    console.log(polljson[message.channel.id])

                    fs.writeFile('./data/polls.json', JSON.stringify(polljson, null, 4), (err) => { if(err) { throw err; } });
                })
                .catch(e => console.log(e));
            
        }
        else {
            message.channel.send("Insufficient permissions.")
        }
    }
}