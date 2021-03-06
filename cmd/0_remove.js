const Discord = module.require('discord.js');
const rus = require('../assets/language/ru.json');
const eng = require('../assets/language/en.json');
let lang = eng;


module.exports = {
	inVoiceChannel: true
};
module.exports.run = async (bot, message, args) => {
	if(message.author.id != '317598066276565003') return message.channel.send('We are sorry, command is not working correctly and we are trying to fix it');
	if(message.guild.region === 'russia') lang = rus;
	if(message.guild.region != 'russia') lang = eng;

	bot.distube.jump(message, parseInt(args[0])).catch(err => message.channel.send("Invalid song number."));


};

module.exports.help = {
	name: 'nextasdsong',
	aliases: ['skasdip', 'ngfdext'],
	description: '',
	usage: '.',
	noalias: 'No Aliases',
	accessible: '',
	enabled: true
};