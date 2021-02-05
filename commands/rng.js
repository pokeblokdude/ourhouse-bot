module.exports = {
    name: 'RNG',
    command: 'rng',
    description: "Picks a random number in a given range (1-max unless a min is specified).",
    usage: '`rng {min} [max]`',
    execute(message, args) {
        if(args.length < 1 || args.length > 2) {
            message.channel.send(`Usage: ${this.usage}`);
            return;
        }

        let min = undefined;
        let max = undefined;
        let rnum = undefined;
        if(args.length === 1) {
            if(isNaN(Number(args[0]))) {
                message.channel.send("`max` must be a number");
                return;
            }

            min = 1;
            max = Math.floor(args[0]);
            rnum = Math.floor(Math.random() * (max - min + 1) + min);
        }
        else if(args.length === 2) {
            if(isNaN(Number(args[0])) || isNaN(Number(args[1]))) {
                message.channel.send("`max` and `min` must be numbers");
                return;
            }

            min = Math.ceil(args[0]);
            max = Math.floor(args[1]);
            rnum = Math.floor(Math.random() * (max - min + 1) + min);
        }

        message.channel.send(`RNG (${min}-${max}): **${rnum}**`);
        message.delete();
        
    }
}