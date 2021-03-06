const Discord = require('discord.js');
const base = require('../base/guilds.json');
const rus = require('../assets/language/ru.json');
const eng = require('../assets/language/en.json');
let lang = eng;
const fs = require('fs');
module.exports.run = async (bot, message, args) => {

	if(message.guild.region === 'russia') lang = rus;
	if(message.guild.region != 'russia') lang = eng;

	const gui = message.guild.id;
	if(!base[gui]) {
		base[gui] = {
			logsChannel:'',
			hiChannel:'',
			on:false,
			zero:'',
			prefix:'.',
			msgHi:'',
			msgBye:'',
		};
	}
	fs.writeFile('./base/guilds.json', JSON.stringify(base, null, '\t'), (err)=>{
		if(err) console.log(err);
	});


	if(!args[0]) return bot.send(`${lang.selectUser}`);
	const rUser = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
	if(!rUser) return message.channel.send(`${lang.csear}`);
	const rreason = args.join(' ').slice(22);
	if(!rreason) return message.channel.send(`${lang.selectReason}`);

	const embed = new Discord.MessageEmbed()
		.setColor('#800080')
		.addField(`📕${lang.manage.rep.claimon}`, `${rUser} with ID: ${rUser.id}`)
		.addField(`📝${lang.manage.rep.claimfor}`, `${message.author} with ID: ${message.author.id}`)
		.addField(`📢${lang.manage.rep.clan}`, message.channel)
		.addField(`📄${lang.manage.reass}`, rreason);

	const okaydm = new Discord.MessageEmbed()
		.setColor('#800080')
		.addField(`${lang.manage.rep.plzwait}`, `${rUser.user.tag}`);

	const chans = base[message.guild.id].logsChannel;
	const rChannel = message.guild.channels.cache.find(c => c.name === chans);
	if(!base[message.guild.id].logsChannel) {
		message.channel.send(`${lang.manage.rep.err}`);
		return;
	}
	else if(rChannel === null) {
		message.channel.send(`${lang.manage.rep.err}`);
		return;
	}
	else{rChannel.send(embed);message.channel.send(okaydm);}

};

module.exports.help = {
	name: 'report',
	aliases: ['rep'],
	description: 'Report on user',
	usage: '.report <@user> <reason>',
	noalias: 'No Aliases',
	accessible: '',
	enabled: true
};