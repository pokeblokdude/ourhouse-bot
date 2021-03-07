const fs = require('fs');
const dayjs = require('dayjs');
const toObject = require('dayjs/plugin/toObject');
dayjs.extend(toObject);
const indexer = require('../commands/stats-index');

// 136630089222848513 - my ID
module.exports = {
    update(message, client, isCommand) {
        let indexes = JSON.parse(fs.readFileSync('./data/index.json'));
        console.log(indexes);
        let userId = message.author.id;
        if(userId === client.user.id) {
            return;
        }
        // ID: { name: string, textChannels: Obj[] }
        let guildObj = indexes[message.guild.id];

        let channelObj = guildObj.textChannels[message.channel.id];

        // If the user is already in the file
        if(channelObj.activeUsers.hasOwnProperty(userId)) {
            isCommand ? channelObj.activeUsers[userId].commandCount++ : channelObj.activeUsers[userId].messageCount++;
        }
        else {
            let userObj = {
                name: message.author.username,
                firstMessageDate: dayjs().toObject(),
                messageCount: isCommand ? 0 : 1,
                commandCount: isCommand ? 1 : 0
            };
            Object.defineProperty(channelObj.activeUsers, message.author.id, {
                value: userObj,
                configurable: true,
                writable: true,
                enumerable: true
            });
        }

        Object.defineProperty(guildObj.textChannels, message.channel.id, channelObj);
        Object.defineProperty(indexes, message.guild.id, guildObj);


        fs.writeFile('./data/index.json', JSON.stringify(indexes, null, 4), (err) => { if(err) { throw err; }});
    }
}