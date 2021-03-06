const Discord = require('discord.js');
const profile = require('../base/profile.json');
const rus = require('../assets/language/ru.json');
const eng = require('../assets/language/en.json');
let lang = eng;
const timely = new Set();
const timelyhours = 6;

exports.run = async (bot, message, args) => {

	if(message.guild.region === 'russia') lang = rus;
	if(message.guild.region != 'russia') lang = eng;

	const avauser = message.author.avatarURL();

	if(timely.has(message.author.id)) {
		const embedtimely = new Discord.MessageEmbed()
			.setColor('RANDOM')
			.setFooter(`"${message.author.username}"`, avauser)
			.addField(`${lang.bonus.kd} - ${timelyhours} ${lang.bonus.hrs}.`);
		message.delete();
		message.channel.send(embedtimely);
		return;
	}
	timely.add(message.author.id);
	profile[message.author.id].coins += 200;
	const embed = new Discord.MessageEmbed()
		.setColor('RANDOM')
		.setFooter(`${lang.bonus.bns} "${message.author.username}"`, avauser)
		.addField(`${lang.bonus.cool}`, `${lang.bonus.take} **200** coins\n ${lang.bonus.kd} - ${timelyhours} ${lang.bonus.hrs}.`);
	message.channel.send(embed);
	setTimeout(() => {
		timely.delete(message.author.id);
	}, timelyhours * 3600000);
};
module.exports.help = {
	name: 'bonus',
	aliases: ['b'],
	description: 'Get a bonus',
	usage: '.bonus',
	noalias: 'No Aliases',
	accessible: '',
	enabled: true
};