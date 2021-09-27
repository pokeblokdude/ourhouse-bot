const { MessageEmbed } = require("discord.js");
const parser = require('./../modules/command-parser.js')

const Poll = require('../model/poll.js');

const optionEmotes = {
    0: "1️⃣",
    1: "2️⃣",
    2: "3️⃣",
    3: "4️⃣",
    4: "5️⃣",
    5: "6️⃣",
    6: "7️⃣",
    7: "8️⃣",
    8: "9️⃣",
    9: "🔟"
};

module.exports = {
    name: 'Poll',
    command: 'poll',
    description: "Starts a poll using command arguments, up to a maximum of 10 voting options. Poll lasts 12hrs unless a duration is specified (-1 = no timer). Currently only supports 1 active poll per channel.",
    category: "general",
    usage: '`poll {minutes} "[title]" "[option 1]"..."[option 10]"`',
    async execute(message, args) {
        if(args.length < 2) {
            message.channel.send(`Usage: ${this.usage}`);
            return;
        }
        // Check whether or not the first argument is a number. If so, remove it from the array and set it to 'duration'
        let duration = isNaN(Number(args[0])) ? 43200 : args.shift() * 60;
        // Turn [word, word, word, ... word] (array of words) into [arg1, arg2, ... argn] (array of arguments)
        const pollargs = parser.parseStrings(args);

        // Check if the command had valid syntax
        if(!pollargs.validsyntax) {
            message.channel.send(`Usage: ${this.usage}`);
            return;
        }
        if(pollargs.data.length > 11) {
            message.channel.send('Please provide 10 or fewer voting options.');
            return;
        }
        
        // Check whether the database even contains any polls
        if(await Poll.findOne({ channelID: message.channel.id }).exec() !== null) {
            message.channel.send('This channel already has an active poll!');
            return;
        }

        // Create poll object
        let polldata = {
            channelID: message.channel.id,
            title: pollargs.data.shift(),
            timestamp: Date.now(),
            duration: duration,
            timed: duration !== "-1" ? true : false,
            totalVotes: 0,
            messageID: null,
            messageURL: null
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
        // Write poll obj to database
        const pollQ = new Poll(polldata);
        await pollQ.save();

        const embed = new MessageEmbed()
            .setAuthor((message.member.nickname || message.author.username), message.author.displayAvatarURL())
            .setTitle(polldata.title)
            .setFooter('React to vote!');
        message.channel.send(embed)
            .then(async function(msg) {
                for(let i = 0; i < polldata.options.length; i++) {
                    msg.react(optionEmotes[i]);
                }
                // Update DB entry to include the ID and URL of the poll message
                const currentPoll = await Poll.findOne({ channelID: message.channel.id }).exec();
                currentPoll.messageID = msg.id;
                currentPoll.messageURL = msg.url;
                await currentPoll.save();

                console.log(`Created poll:`);
                console.log(currentPoll);
                    
            })
            .catch(e => console.log(e));
        message.delete();
    }
}