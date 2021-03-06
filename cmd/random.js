const Discord = require('discord.js');
const rus = require('../assets/language/ru.json');
const eng = require('../assets/language/en.json');
let lang = eng;

module.exports.run = async (bot, message, args) => {
	const fs = require('fs');
	const fff = require('../base/inf.json');
	fff.ran ++;
	fs.writeFile('./base/inf.json', JSON.stringify(fff, null, '\t'), (err)=>{
		if(err) console.log(err);
	});
	if(message.guild.region === 'russia') lang = rus;
	if(message.guild.region != 'russia') lang = eng;

	const user = message.guild.members.cache.random();
	const random = new Discord.MessageEmbed()
		.setColor('#11FF00')
		.setDescription(`**${lang.manage.user}: ${user.user}**\n**ID ${lang.manage.userf}:**${user.id}`);
	bot.send(random);
};
module.exports.help = {
	name: 'random',
	aliases: ['r'],
	description: 'Random user selection',
	usage: '.random',
	noalias: 'No Aliases',
	accessible: '',
	enabled: true
};