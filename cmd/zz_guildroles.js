const Discord = module.require('discord.js');
const rus = require('../assets/language/ru.json');
const eng = require('../assets/language/en.json');
let lang = eng;

module.exports.run = async (bot, message, args) => {
	const fs = require('fs');
	const fff = require('../base/inf.json');
	fff.gr ++;
	fs.writeFile('./base/inf.json', JSON.stringify(fff, null, '\t'), (err)=>{
		if(err) console.log(err);
	});
	if(message.guild.region === 'russia') lang = rus;
	if(message.guild.region != 'russia') lang = eng;

	const embed = new Discord.MessageEmbed()
		.setColor('000')
		.addField(`${lang.grols.countr}:`, message.guild.roles.size)
		.addField(`${lang.grols.namer}:`, message.guild.roles.cache())
		.setFooter(message.author.tag, message.author.displayAvatarURL());

	bot.send(embed);
};
module.exports.help = {
	name: 'guildroles',
	aliases: ['gr'],
	description: 'All the roles of the Guild',
	usage: '.guildroles',
	noalias: 'No Aliases',
	accessible: '',
	enabled: false

};