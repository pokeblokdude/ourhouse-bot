module.exports = {
    // Turn [word, word, word, ... word] (array of words) into [arg1, arg2, ... argn] (array of arguments)
    // Example: ['"That', 'was', 'pog', 'dude."', '"Wow."']  ===>  ['That was pog dude.', 'Wow.']
    // Returns an object with a data (the actual array) and validsyntax variable (whether the resulting array is useable or not)
    parseStrings(args) {
        const strings = args.reduce(function(acc, val) {
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

        return { data: strings.data, validsyntax: strings.validsyntax };
    }
}