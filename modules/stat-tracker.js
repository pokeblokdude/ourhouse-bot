const User = require('./../model/user');
const Message = require('./../model/message');
const Channel = require('./../model/channel');

// 136630089222848513 - my ID
module.exports = {
    async update(message, isCommand) {
        const messageObj = {
            messageID: message.id,
            channelID: message.channelId,
            authorID: message.author.id,
            content: message.content,
            isCommand: isCommand,
            timestamp: message.createdTimestamp
        };

        const messageQ = new Message(messageObj);
        await messageQ.save();


        let channelObj = await Channel.findOne({ channelID: message.channel.id }).exec();
        let channelQ = null;
        if(channelObj === null) {
            channelObj = {
                channelID: message.channel.id,
                messages: [ message.id ]
            };
            channelQ = new Channel(channelObj);
        }
        else {
            channelObj.messages.push(message.id);
        }

        if(channelQ !== null) {
            await channelQ.save()
        }
        else {
            await channelObj.save();
        }
        

        let userObj = await User.findOne({ userID: message.author.id }).exec();
        let userQ = null;
        if(userObj === null) {
            userObj = {
                userID: message.author.id,
                username: message.author.username + "#" + message.author.discriminator,
                totalMessages: 1,
                messages: [ message.id ]
            };
            userQ = new User(userObj);
        }
        else {
            userObj.totalMessages = userObj.totalMessages + 1;
            userObj.messages.push(message.id);
        }

        if(userQ !== null) {
            await userQ.save();
        }
        else {
            await userObj.save();
        }
    }
}