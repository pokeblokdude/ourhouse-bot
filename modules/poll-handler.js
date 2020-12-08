const fs = require('fs');
const timeConverter = require('./convert-timestamp.js');
const polls = require('./../data/polls.json');
const { Message } = require('discord.js');

function calcPercentage(poll) {
        
}
function convertPercentageToText(percentage) {

    return [];
}

const optionEmotes = {
    0: "1️⃣",
    1: "2️⃣",
    2: "3️⃣",
    3: "4️⃣",
    4: "5️⃣",
    5: "6️⃣"
};

module.exports = {
    polls: JSON.parse(fs.readFileSync('./data/polls.json')),
    updatePolls: function(client) {
        if(polls.empty) return;
        // Iterate through each active poll
        Object.keys(polls).forEach(poll => {
            if(poll !== "empty") {
                // IT WORKS AT LEAST UP TO THIS LINE
                client.channels.fetch(poll).then(channel => console.log(channel));
                // Iterate through each property of the current poll
                // Object.keys(poll).forEach(pollProps => {
                    
                        // .then(channel => channel.messages.fetch(pollProps.messageid)
                        //     .then(message => {
                        //         if(!pollProps.layoutComplete) {
                        //             for(let i = 0; i < pollProps.options.length; i++) {
                        //                 message.react(optionEmotes[i]);
                        //             }
                        //             pollProps.layoutComplete = true;
                        //         }
                                
                                 
                        //         //message.edit();
                        //         fs.writeFile('./data/polls.json', JSON.stringify(polls, null, 4), (err) => { if(err) { throw err; } });
                        //     })).catch(err => {throw err});
                // });
            }
            else {
                return;
            }
        });
    },
    endPoll: function(id) {
        delete polls[id];
        if(Object.keys(polls).length === 1) {
            polls.empty = true;
        }
        return fs.writeFile('./data/polls.json', JSON.stringify(polls, null, 4), (err) => { if(err) { throw err; } });
    }
}

