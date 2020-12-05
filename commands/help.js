const fs = require('fs');

module.exports = {
    name: 'help',
    description: "Returns a list of all commands.",
    usage: '`help`',
    execute(message, args) {
        let namelist = [];
        let desclist = [];
        let usagelist = [];

        var files = fs.readdirSync('./');
        let commandFiles = files.filter(file => file.endsWith('.js'));
        for(const file of commandFiles) {
            const command = require(`./${file}`);
            namelist.push(command.hasOwnProperty('name') ? command.exports.name : 'unnamed');
            desclist.push(command.hasOwnProperty('description') ? command.exports.description : 'no description');
            usagelist.push(command.hasOwnProperty('usage') ? command.exports.usage : 'undefined usage');
        }

        for(let i = 0; i < namelist.length; i++) {
            // send help text
            message.author.send(`**${namelist[i]}** \n${desclist[i]} \n${usage[i]}`);
        }
        
    }
}