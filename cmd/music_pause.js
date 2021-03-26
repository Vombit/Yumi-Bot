const Discord = module.require('discord.js');
const rus = require('../assets/language/ru.json');
const eng = require('../assets/language/en.json');
let lang = eng;

module.exports = {
	inVoiceChannel: true
};
module.exports.run = async (bot, message, args) => {
	if (message.guild.id != '400355776717127690')	return message.channel.send('You don\'t have a premium account');
	if(message.guild.region === 'russia') lang = rus;
	if(message.guild.region != 'russia') lang = eng;

	const queue = bot.distube.getQueue(message)
	if (!queue) return message.channel.send(`❌ | ${lang.music.stop} | ❌`)
	if (queue.pause) {
		bot.distube.resume(message)
		return message.channel.send(`${lang.music.resume}`)
	}
	bot.distube.pause(message)
	message.channel.send(`${lang.music.pause}`)
};
module.exports.help = {
	name: 'pause',
	aliases: ['hold'],
	description: 'Pause music',
	usage: '.pause',
	noalias: 'No Aliases',
	accessible: '',
	enabled: true
};
