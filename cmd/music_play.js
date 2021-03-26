const Discord = module.require('discord.js');
const rus = require('../assets/language/ru.json');
const eng = require('../assets/language/en.json');
let lang = eng;

module.exports = {
	inVoiceChannel: true
};
module.exports.run = async (bot, message, args) => {
	if(message.guild.region === 'russia') lang = rus;
	if(message.guild.region != 'russia') lang = eng;

    const string = args.join(" ")
    if (!string) return message.channel.send(`${lang.music.valid}`)
    try {
        bot.distube.play(message, string)
    } catch (e) {
        message.channel.send(`❌ | ${lang.music.err} | ❌`)
		//message.channel.send(`❌ | Error: \`${e}\``)
    }
};
module.exports.help = {
	name: 'play',
	aliases: ['pl'],
	description: 'Includes music',
	usage: '.play <request>/<Url>',
	noalias: 'No Aliases',
	accessible: '',
	enabled: true
};
