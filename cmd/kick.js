const Discord = module.require('discord.js');
const base = require('../base/guilds.json');
const rus = require('../assets/language/ru.json');
const eng = require('../assets/language/en.json');
let lang = eng;

module.exports.run = async (bot, message, args) => {
	if(message.guild.region === 'russia') lang = rus;
	if(message.guild.region != 'russia') lang = eng;

	if(!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send(`${lang.permsuser}`);
	if(!message.guild.me.hasPermission('KICK_MEMBERS')) return message.channel.send(`${lang.permsbot}`);

	const us = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
	if (!us) return message.channel.send(`${lang.selectUser}`);
	if (us.hasPermission('ADMINISTRATOR')) return message.channel.send(`${lang.manage.kick.unkick}`);
	const reason = args.slice(1).join(' ');
	if (!reason) return message.channel.send(`${lang.selectReason}`);

	us.send(`${lang.manage.kick.uskSend} ${message.guild.name}, ${lang.manage.usReas}: ${reason}`).then(() =>
		us.kick()).catch(err => console.log(err));

	message.channel.send(`**${us.user.username}** ${lang.manage.kick.guilds}`);

	const embed = new Discord.RichEmbed()
		.setColor('#FF1111')
		.setAuthor('Yumi Logs', bot.user.displayAvatarURL)
		.addField(`${lang.manage.command}`, 'kick')
		.addField(`${lang.manage.user}`, us.user.username)
		.addField(`${lang.manage.moder}`, message.author.username)
		.addField(`${lang.manage.reass}`, reason)
		.setTimestamp();

	const chans = base[message.guild.id].logsChannel;
	const rChannel = message.guild.channels.find(c => c.name === chans);
	if(!base[message.guild.id].logsChannel) {return;}
	else if(rChannel === null) {return;}
	else{rChannel.send(embed);}
};
module.exports.help = {
	name: 'kick',
	aliases: ['k'],
	description: 'Kick out user guilds.',
	usage: '.kick <@user> <reason>',
	noalias: 'No Aliases',
	accessible: 'KICK_MEMBERS',
	enabled: true
};