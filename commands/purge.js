module.exports = {
    name: '[LOCKED] Purge',
    command: 'purge',
    description: "Delete a specified number of messages, up to a maximum of 100 at a time.",
    usage: "`purge [number of messages]`",
    execute(message, args) {
        //               Engineer' (Our House) = 784934880433143809, "Admin" (Bot Testing) = 735229898871799971
        if(message.member.roles.cache.find(r => r.id === '784934880433143809' || '735229898871799971')) {
            if(args.length !== 1) {
                message.channel.send(`Usage: ${this.usage}`);
                return;
            }
            let n = args[0];
            message.channel.bulkDelete(n);
            message.channel.send(`Removed ${n} messages.`);
        }
        else {
            message.channel.send('Insufficient permissions.')
        }
    }
}