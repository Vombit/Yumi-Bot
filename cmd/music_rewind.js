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

	const time = args[0] * 1000;
	bot.distube.seek(message, Number(time));


};

module.exports.help = {
	name: 'rewind',
	aliases: ['seek'],
	description: 'Sets the song value for the time (seconds)',
	usage: '.rewind <seconds>',
	noalias: 'No Aliases',
	accessible: '',
	enabled: true
};
