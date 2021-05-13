const parser = require('./../../modules/command-parser.js');

const config = require('./../../data/config.json');
const token = config['lastfm-token'];

const LastFM = require('last-fm');
const lastfm = new LastFM(token);

const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'Search',
    command: 'search',
    description: "Searches for an album, artist or track on LastFM and displays the info in a pretty message embed.",
    category: "loft",
    usage: '`loft search [track | album | artist] [search args]`',
    execute(message, args) {
        // TODO: use last-fm to seach LastFM, get object, get appropriate info from object, print in message embed
        if(args.length < 2) {
            message.channel.send(`Usage: ${this.usage}`);
            return;
        }
        const searchType = args.shift().toLowerCase();
        const searchStr = parser.parseSingle(args);
        lastfm.search({ q: searchStr }, (err, data) => {
            if(err) { throw err; }
            //console.log(data);

            const embed = new MessageEmbed();
            switch(searchType) {
                case 'artist':
                case 'ar':
                case 'at':
                    let artist = data.result.artists[0];
                    console.log(artist);
                    lastfm.artistInfo({ name: artist.name }, (e, a) => {
                        if(e) { throw e; }
                        let tags = a.tags.reduce((acc, val) => acc.concat("*" + val + "*, "), " ");
                        tags = tags.substring(0, tags.length-2);
                        embed.setAuthor("Artist", 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/twitter/281/saxophone_1f3b7.png')
                            .setTitle(`**${a.name}**`)
                            .setFooter("Data from Last.fm")
                            .setDescription(`> ${a.summary}`)
                            .addField("Info", `${a.listeners} listeners\nTags: ${tags}`)
                        ;
                        message.channel.send(embed);
                    });
                    break;
                case 'album':
                case 'al':
                case 'ab':
                    let album = data.result.albums[0];
                    console.log(album);
                    embed.setTitle(`**${album.name}**`)
                        //.setImage(artist.images[4])
                        .setAuthor("Album", 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/twitter/281/computer-disk_1f4bd.png')
                    ;
                    message.channel.send(embed);
                    break;
                case 'track':
                case 'tr':
                case 't':
                    let track = data.result.tracks[0];
                    console.log(track);
                    embed.setTitle(`**${track.name}**`)
                        //.setImage(track.images[4])
                        .setAuthor("Track", 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/twitter/281/optical-disk_1f4bf.png')
                    ;
                    message.channel.send(embed);
                    break;
                default:
                    message.channel.send("Invalid search type");
                    return;
            }
        });
    }
}