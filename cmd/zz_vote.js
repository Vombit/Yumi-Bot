const Discord = module.require('discord.js');
const rus = require('../assets/language/ru.json');
const eng = require('../assets/language/en.json');
let lang = eng;

const profile = require('../base/profile.json');
const timely = new Set();
const timelyhours = 24;

module.exports.run = async (bot, message, args) => {
	if(message.guild.region === 'russia') lang = rus;
	if(message.guild.region != 'russia') lang = eng;

	const embed = new Discord.MessageEmbed()
		.setColor('#d60a4c')
		.setAuthor('Yumi Bot', bot.user.displayAvatarURL)
		.setTitle(`${lang.vot}`)
		.setURL('https://top.gg/bot/643676300879331359/vote');
	message.channel.send(embed);



	/*

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

	*/
	//profile[message.author.id].coins += 200;
	//message.channel.send(`${lang.math.get} **200** coins!`);
};
module.exports.help = {
	name: 'vote',
	aliases: ['vot'],
	description: 'Vote for Yumi (you get 200 coins)',
	usage: '.vote',
	noalias: 'No Aliases',
	accessible: '',
	enabled: true
};