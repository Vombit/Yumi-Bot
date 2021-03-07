const Discord = module.require('discord.js');
const rus = require('../assets/language/ru.json');
const eng = require('../assets/language/en.json');
let lang = eng;


module.exports = {
	inVoiceChannel: true
};
module.exports.run = async (bot, message, args) => {
	if (message.guild.id != '400355776717127690')	return message.channel.send('We are sorry, command is not working correctly and we are trying to fix it');
	//xif(message.author.id != '317598066276565003') return message.channel.send('We are sorry, command is not working correctly and we are trying to fix it');
	if(message.guild.region === 'russia') lang = rus;
	if(message.guild.region != 'russia') lang = eng;

	const queue = bot.distube.getQueue(message)
	if (!queue) return message.channel.send(`❌ | ${lang.music.stop} | ❌`)
	try {
		bot.distube.skip(message)
		message.channel.send(`${lang.music.next} \n${queue.songs[0].name}`)
	} catch (e) {return}


};

module.exports.help = {
	name: 'next',
	aliases: ['skip'],
	description: 'Switch to the next music',
	usage: '.next',
	noalias: 'No Aliases',
	accessible: '',
	enabled: true
};