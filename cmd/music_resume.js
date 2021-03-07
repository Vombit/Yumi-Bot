const Discord = module.require('discord.js');
const rus = require('../assets/language/ru.json');
const eng = require('../assets/language/en.json');
let lang = eng;

module.exports = {
	inVoiceChannel: true
};
module.exports.run = async (bot, message, args) => {
	//if (message.guild.id != '400355776717127690')	return message.channel.send('We are sorry, command is not working correctly and we are trying to fix it');
	//if(message.author.id != '317598066276565003') return message.channel.send('We are sorry, command is not working correctly and we are trying to fix it');
	if(message.guild.region === 'russia') lang = rus;
	if(message.guild.region != 'russia') lang = eng;

	const queue = bot.distube.getQueue(message)
        if (!queue) return message.channel.send(`❌ | ${lang.music.stop} | ❌`)
        bot.distube.resume(message)
        message.channel.send(`${lang.music.resume}`)


};

module.exports.help = {
	name: 'resume',
	aliases: ['unpause'],
	description: 'Resume music',
	usage: '.resume',
	noalias: 'No Aliases',
	accessible: '',
	enabled: true
};