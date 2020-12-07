const fs = require('fs');
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: '[LOCKED] Poll',
    command: 'poll',
    description: "Stars a poll using command arguments. Currently does nothing.",
    usage: '`poll "[title]" "[option 1]"..."[option n]"`',
    execute(message, args) {
        if(args.length < 2) {
            message.channel.send(`Usage: ${this.usage}`);
            return;
        }
        //               Engineer' (Our House) = 784934880433143809, "Admin" (Bot Testing) = 735229898871799971
        if(message.member.roles.cache.find(r => r.id === '784934880433143809' || '735229898871799971')) {
            console.log(args);
            // Turn [arg1, arg2, arg3, arg4, ... , argn] (array of words) into [title, option1, option2, ... , optionn] (array of strings)
            const pollargs = args.reduce(function(acc, val) {
                if(val.startsWith("\"")) {
                    if(acc.instring) {
                        acc.validsyntax = false;
                    }
                    else {
                        let str = val.slice(1);
                        if(!val.endsWith("\"")) {
                            acc.instring = true;
                        }
                        else {
                            str = str.substring(0, str.length-1);
                        }
                        acc.data.push(str);
                        acc.counter += 1;
                    }
                }
                else if(val.endsWith("\"")) {
                    if(!acc.instring) {
                        acc.validsyntax = false;
                    }
                    else {
                        acc.data[acc.counter] = acc.data[acc.counter].concat(' ' + val.substring(0, val.length-1));
                        acc.instring = false;
                    }
                }
                else {
                    acc.data[acc.counter] = acc.data[acc.counter].concat(' ' + val);
                }
                return acc;
            }, { data: [], counter: -1, instring: false, validsyntax: true });

            console.log(pollargs);
            // Check if the command had valid syntax
            if(!pollargs.validsyntax) {
                message.channel.send(`Usage: ${this.usage}`);
                return;
            }
            
            // Actual data from the polls.json file
            let polljson = JSON.parse(fs.readFileSync('./data/polls.json'));
            console.log(polljson);
            if(JSON.parse(polljson.hasOwnProperty(message.channel.id))){
                message.channel.send('This channel already has an active poll!');
                return;
            }

            let polldata = {
                title: pollargs.data.shift()
            };
            for(let i = 0; i < pollargs.data.length; i++) {
                Object.defineProperty(polldata, i, {
                    value: {
                        name: pollargs.data[i],
                        percentage: undefined
                    },
                    writable: true,
                    configurable: true,
                    enumerable: true
                });
            }

            Object.defineProperty(polljson, message.channel.id, {
                value: polldata,
                writable: true,
                configurable: true,
                enumerable: true
            });
            Object.defineProperty(polljson, "empty", {
                value: false,
                writable: true,
                configurable: true,
                enumerable: true
            });
            
            fs.writeFile('./data/polls.json', JSON.stringify(polljson, null, 4), (err) => { if(err) { throw err; } });
            const embed = new MessageEmbed().setTitle(polldata.title).setDescription();
            message.channel.send(embed);
        }
        else {
            message.channel.send("Insufficient permissions.")
        }
    }
}