module.exports = {
    name: 'Purge',
    command: 'purge',
    description: "Delete a specified number of messages, up to a maximum of 100 at a time.",
    usage: "`purge [number of messages]`",
    execute(message, args) {
        if(args.length !== 1) {
            message.channel.send(`Usage: ${this.usage}`);
            return;
        }
        let n = args[0];
        message.channel.bulkDelete(n);
        message.channel.send(`Removed ${n} messages.`);
    }
}