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
    updatePolls() {
        if(polls.empty) return;
        Object.keys(polls).forEach(key => {
            if(key !== "empty") {

            }
            else {
                return;
            }
        })
    }
}

