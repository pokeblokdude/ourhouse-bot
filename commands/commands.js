const fs = require('fs');

module.exports = {
    name: 'commands',
    description: "Returns a list of all commands.",
    usage: '`commands`',
    execute(message, args) {
        let namelist = [];
        let desclist = [];
        let usagelist = [];

        fs.readdir('./', (err, files) => {
            if(err) console.log(err);

            let commandFiles = files.filter(file => file.endsWith('.js'));
            for(const file of commandFiles) {
                const command = require(`./${file}`);
                namelist.push(command.hasOwnProperty('name') ? command.name : 'unnamed');
                desclist.push(command.hasOwnProperty('description') ? command.description : 'no description');
                usagelist.push(command.hasOwnProperty('usage') ? command.usage : 'undefined usage');
            }

            for(let i = 0; i < namelist.length; i++) {
                // send help text
                message.author.send(`**${namelist[i]}** \n${desclist[i]} \n${usage[i]}`);
            }
        });
        
    }
}