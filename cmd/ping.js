const Discord = module.require('discord.js');

module.exports.run = async (bot, message, args) => {
	
	const fs = require('fs');
	const fff = require('../base/inf.json');
	fff.pg ++;
	fs.writeFile('./base/inf.json', JSON.stringify(fff, null, '\t'), (err)=>{
		if(err) console.log(err);
	});

	const embed = new Discord.MessageEmbed()
		.setColor('GREEN')
		.setAuthor('Ping-Pong! 🏓')
		.setDescription(`${Date.now() - message.createdTimestamp}` + ' ms')
		.setTimestamp();
	message.channel.send(embed);
};
module.exports.help = {
	name: 'ping',
	aliases: ['pg'],
	description: 'Ping-Pong ms',
	usage: '.ping',
	noalias: 'No Aliases',
	accessible: '',
	enabled: true
};