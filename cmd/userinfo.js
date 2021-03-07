const Discord = module.require('discord.js');
const rus = require('../assets/language/ru.json');
const eng = require('../assets/language/en.json');
let lang = eng;

module.exports.run = async (bot, message, args) => {
	if(message.guild.region === 'russia') lang = rus;
	if(message.guild.region != 'russia') lang = eng;

	const a = message.mentions.users.first() || message.author;
	const embed = new Discord.MessageEmbed()
		.setDescription(`${lang.useri.info}`)
		.setColor('#10c7e2')
		.addField(`${lang.useri.name}:`, a.username, true)
		.addField('ID', a.id, true)
		.addField(`${lang.useri.discr}:`, a.discriminator, true)
		.addField(`${lang.useri.create}:`, a.createdAt, true)
		.setThumbnail(a.displayAvatarURL())
		.setFooter('Yumi', bot.user.displayAvatarURL());

	bot.send(embed);

};
module.exports.help = {
	name: 'userinfo',
	aliases: ['ui'],
	description: 'User information',
	usage: '.userinfo <@user>',
	noalias: 'No Aliases',
	accessible: '',
	enabled: true
};