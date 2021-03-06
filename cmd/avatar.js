const Discord = module.require('discord.js');
module.exports.run = async (bot, message, args) => {

	const user = message.mentions.users.first() || message.author;
	const embed = new Discord.MessageEmbed()
		.setColor('RANDOM')
		.setDescription(user.tag)
		.setImage(`${user.displayAvatarURL()}?size=2048`);
	message.channel.send(embed);
};
module.exports.help = {
	name: 'avatar',
	aliases: ['a', 'ava'],
	description: 'View user avatar',
	usage: '.avatar <@user>',
	noalias: 'No Aliases',
	accessible: '',
	enabled: true
};