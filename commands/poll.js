const fs = require('fs');
const polljson = require('./../data/polls.json');

module.exports = {
    name: 'Poll',
    command: 'poll',
    description: "Stars a poll using command arguments. Currently broken.",
    usage: '`poll "[title]" "[option 1]"..."[option n]"`',
    execute(message, args) {
        if(args.length < 2) {
            message.channel.send(`Usage: ${this.usage}`);
            return;
        }
        console.log(args);
        // Turn [arg1, arg2, arg3, arg4, ... , argn] (array of words) into [title, option1, option2, ... , optionn] (array of strings)
        const pollargs = args.reduce(function(acc, val) {
            console.log(acc);
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
        
        fs.writeFile('./data/polls.json', JSON.stringify(polljson, null, 4), (err) => { if(err) { throw err; } else { message.channel.send(`Wrote ${polldata} to \`polls.json\``) } });
    }
}