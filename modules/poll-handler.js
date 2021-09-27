const timeConverter = require('./convert-timestamp.js');
const { MessageEmbed } = require('discord.js');
const dayjs = require('dayjs');

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

const barAmounts = {
     0: "⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜",
     1: "🟦⬜⬜⬜⬜⬜⬜⬜⬜⬜",
     2: "🟦🟦⬜⬜⬜⬜⬜⬜⬜⬜",
     3: "🟦🟦🟦⬜⬜⬜⬜⬜⬜⬜",
     4: "🟦🟦🟦🟦⬜⬜⬜⬜⬜⬜",
     5: "🟦🟦🟦🟦🟦⬜⬜⬜⬜⬜",
     6: "🟦🟦🟦🟦🟦🟦⬜⬜⬜⬜",
     7: "🟦🟦🟦🟦🟦🟦🟦⬜⬜⬜",
     8: "🟦🟦🟦🟦🟦🟦🟦🟦⬜⬜",
     9: "🟦🟦🟦🟦🟦🟦🟦🟦🟦⬜",
    10: "🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦"
};

const addReactions = (message, reactions) => {
    message.react(reactions[0]);
    reactions.shift();
    if(reactions.length > 0) {
        setTimeout(() => addReactions(message, reactions), 300);
    }
}

module.exports = {
    async endPoll(channelID) {
        await Poll.deleteOne({ channelID: channelID});
    },
    async updatePolls(client) {
        const polls = await Poll.find({});
        console.log(dayjs().toString() + ' updating polls');
        // Do nothing if there are no polls
        if(!polls.length) {
            console.log("> No polls found");
            return;
        }
        // Iterate through each active poll
        for(const pollObj of polls) {
            try {
                let shouldEndPoll = false;
            
                // fetch() returns a promise, meaning you can't do anything with it in the same statement
                // Also you have to use async/await if you don't want to deal with the massive headache that is .then() and .catch() statements
                let channelObj = await client.channels.cache.get(pollObj.channelID);
                let messageObj = await channelObj.messages.fetch(pollObj.messageID, false, true);
                
                // READ UPDATED VOTES
                // Calculate percentages
                let totalVotes = 0;
                for(let i = 0; i < pollObj.options.length; i++) {
                    let r = await messageObj.reactions.cache.get(pollObj.options[i].reaction);
                    console.log(r.count);
                    pollObj.options[i].votes = r.count - 1;
                    totalVotes += pollObj.options[i].votes;
                    pollObj.totalVotes = totalVotes;
                }
                if(totalVotes > 0) {
                    for(let i = 0; i < pollObj.options.length; i++) {
                        pollObj.options[i].percentage = Math.floor(pollObj.options[i].votes / pollObj.totalVotes * 100);
                    }
                }
                else {
                    for(let i = 0; i < pollObj.options.length; i++) {
                        pollObj.options[i].percentage = 0;
                    }
                }
                
                // Calculate time remaining if timed
                let timeRemaining = "";
                if(pollObj.timed) {
                    let rawTimeRemaining = pollObj.duration*1000 - (Date.now() - pollObj.timestamp);
                    if(rawTimeRemaining <= 0) shouldEndPoll = true;
                    timeRemaining = timeConverter.convertTime(rawTimeRemaining);
                }

                // Put all this info into a string
                let embedDesc = "";
                for(let i = 0; i < pollObj.options.length; i++) {
                    embedDesc = embedDesc.concat(`${optionEmotes[i]} ${pollObj.options[i].name}\n${barAmounts[Math.floor(pollObj.options[i].percentage/10)]}     ${pollObj.options[i].percentage}%\nVotes: ${pollObj.options[i].votes}\n\n`);
                }

                // Get the old embed
                oldEmbed = messageObj.embeds[0];
                // Make a new embed using its data and the processed object data
                let newEmbed = new MessageEmbed()
                    .setTitle(oldEmbed.title)
                    .setAuthor(oldEmbed.author.name, oldEmbed.author.iconURL)
                    .setFooter(shouldEndPoll ? "Poll has ended." : (pollObj.timed ? `Time remaining: ${timeRemaining}` : "Untimed poll."))
                    .setDescription(embedDesc);

                // Edit the message with the new embed
                // message.edit() CANNOT EDIT AN EMBED. IT CAN ONLY REPLACE IT WITH ANOTHER EMBED
                messageObj.edit(newEmbed);
                if(shouldEndPoll) {
                    this.endPoll(pollObj.channelID);
                    messageObj.channel.send(`Ended poll: "${pollObj.title} (Time elapsed)"\n${messageObj.url}`);
                }
                else {
                    await pollObj.save();
                }
                
            }
            catch(e) {
                console.log(e);
            }
        }
    }
}

