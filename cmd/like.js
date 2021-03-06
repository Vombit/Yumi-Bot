const Discord = module.require('discord.js');
const profile = require('../base/profile.json');
const rus = require('../assets/language/ru.json');
const eng = require('../assets/language/en.json');
let lang = eng;
const timely = new Set();
const timelyhours = 24;
module.exports.run = async (bot, message, args) => {
	const fs = require('fs');
	const fff = require('../base/inf.json');
	fff.l ++;
	fs.writeFile('./base/inf.json', JSON.stringify(fff, null, '\t'), (err)=>{
		if(err) console.log(err);
	});
	if(message.guild.region === 'russia') lang = rus;
	if(message.guild.region != 'russia') lang = eng;

	if(timely.has(message.author.id)) {
		const embedtimely = new Discord.MessageEmbed()
			.setTimestamp()
			.setColor('RED')
			.addField(`${lang.like.kd} ${timelyhours}${lang.like.hrs}.`);
		//message.delete();
		message.channel.send(embedtimely);
		return;
	}
	const user = message.mentions.users.first() || message.author;

	if(user.bot) return message.channel.send(`${lang.like.er}`);
	timely.add(message.author.id);

	profile[user.id].rep += 1;

	const embed = new Discord.MessageEmbed()
		.setTimestamp()
		.setColor('GREEN')
		.addField(`${lang.like.cool}`, `${lang.like.send}: ${user.username}`);
	message.channel.send(embed);
	setTimeout(() => {
		timely.delete(message.author.id);
	}, timelyhours * 3600000);
};
module.exports.help = {
	name: 'like',
	aliases: ['l'],
	description: 'Send a like to the user',
	usage: '.like <@user>',
	noalias: 'No Aliases',
	accessible: '',
	enabled: true
};