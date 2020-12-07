const fs = require('fs');
const polls = require('./../data/polls.json');

function calcPercentage(poll) {
        
}
function convertPercentageToText(percentage) {

    return [];
}

const optionEmotes = {
    0: ":one:",
    1: ":two:",
    2: ":three:",
    3: ":four:",
    4: ":five:",
    5: ":six:"
};

module.exports = {
    polls: JSON.parse(fs.readFileSync('./data/polls.json')),
    updatePolls: function() {
        if(polls.empty) return;
        Object.keys(polls).forEach(key => {
            if(key !== "empty") {

            }
            else {
                return;
            }
        })
    },
    endPoll: function(id) {
        delete polls[id];
        if(Object.keys(polls).length === 1) {
            polls.empty = true;
        }
        return fs.writeFile('./data/polls.json', JSON.stringify(polls, null, 4), (err) => { if(err) { throw err; } });
    }
}

