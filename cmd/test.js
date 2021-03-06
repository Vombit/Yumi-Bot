const Discord = module.require('discord.js');
const rus = require('../assets/language/ru.json');
const eng = require('../assets/language/en.json');
let lang = eng;

module.exports.run = async (bot, message, args) => {
	if(message.author.id != '317598066276565003') return message.channel.send('We are sorry, command is not working correctly and we are trying to fix it');

	if(message.guild.region === 'russia') lang = rus;
	if(message.guild.region != 'russia') lang = eng;


};

module.exports.help = {
	name: 'test',
	aliases: ['test'],
	description: '',
	usage: '.',
	noalias: 'No Aliases',
	accessible: '',
	enabled: true
};