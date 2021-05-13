const fs = require('fs');

module.exports = {
    name: "Index",
    command: "index",
    description: "Indexes or resets the index for the current server for use with all stats commands. Only needs to be done once. Use `stats-checkindex` to see if it has already been indexed.",
    category: "stats",
    usage: '`stats index`',
    execute(message, args) {
        const indexes = JSON.parse(fs.readFileSync('./data/index.json'));
        
        let guildData = {
            name: message.guild.name,
            textChannels: {}
        };

        let channels = message.guild.channels.cache.array().filter((channel) => channel.type === 'text');
        for(const channel in channels) {
            let channelObj = {
                name: channels[channel].name,
                activeUsers: {}
            }
            Object.defineProperty(guildData.textChannels, channels[channel].id, {
                value: channelObj,
                writable: true,
                configurable: true,
                enumerable: true
            });
        }

        Object.defineProperty(indexes, message.guild.id, {
            value: guildData,
            writable: true,
            configurable: true,
            enumerable: true
        });

        fs.writeFile('./data/index.json', JSON.stringify(indexes, null, 4), (err) => { if(err) { throw err; } });
        message.channel.send(`Indexed **${message.guild.name}**`);
    }
}