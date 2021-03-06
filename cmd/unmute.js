const Discord = module.require('discord.js');
const base = require('../base/guilds.json');
const rus = require('../assets/language/ru.json');
const eng = require('../assets/language/en.json');
let lang = eng;

module.exports.run = async (bot, message, args) => {

	if(message.guild.region === 'russia') lang = rus;
	if(message.guild.region != 'russia') lang = eng;

	if(!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send(`${lang.permsuser}`);
	if(!message.guild.me.hasPermission('MANAGE_ROLES')) return message.channel.send(`${lang.permsbot}`);

	const us = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
	if (!us) return message.channel.send(`${lang.selectUser}`);

	const reason = args.slice(1).join(' ');
	if (!reason) return message.channel.send(`${lang.selectReason}`);

	const muterole = message.guild.roles.find(r => r.name === 'Muted');
	if (!muterole) return message.channel.send(`${lang.manage.unmute.unmute}`);

	us.removeRole(muterole.id).then(() => {
		message.delete();
		us.send(`${lang.manage.unmute.usmSend} ${message.guild.name}, ${lang.manage.usReas}: ${reason}.`);
		message.channel.send(`${us.user.username} ${lang.manage.unmute.guildsm}.`);
	});

	const embed = new Discord.RichEmbed()
		.setColor('#FF1111')
		.setAuthor('Yumi Logs', bot.user.displayAvatarURL)
		.addField(`${lang.manage.command}`, 'unmute')
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
	name: 'unmute',
	aliases: ['um'],
	description: 'Unmute Guild user',
	usage: '.unmute <@user> <reason>',
	noalias: 'No Aliases',
	accessible: 'MANAGE_ROLES',
	enabled: true
};