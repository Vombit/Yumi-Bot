const Discord = module.require('discord.js');
const rus = require('../assets/language/ru.json');
const eng = require('../assets/language/en.json');
let lang = eng;

module.exports.run = async (bot, message, args) => {
	if(message.guild.region === 'russia') lang = rus;
	if(message.guild.region != 'russia') lang = eng;

	try{
		//const verifilv = lang.servi.verifilv;
		const embed = new Discord.MessageEmbed()
			.setAuthor(message.guild.name, message.guild.iconURL())
			.setDescription(`\n ${lang.servi.info}:`)
			.addField(`${lang.servi.creator}:`, message.guild.owner, true)
			.addField(`${lang.servi.idserv}:`, message.guild.id, true)
			.addField(`${lang.servi.secu}:`, message.guild.verificationLevel, true)
			.addField(`${lang.servi.reg}:`, message.guild.region, true)
			.addField(`${lang.servi.count}:`, message.guild.memberCount, true)
			.addField(`${lang.servi.memb}:`, `[${message.guild.presences.cache.size}] ${lang.servi.online}\n[${message.guild.members.cache.filter(mem => mem.user.bot === true).size}] ${lang.servi.bots}\n[${message.guild.memberCount}] ${lang.servi.allc}`, true)
			.addField(`${lang.servi.chan}:`, `${message.guild.channels.cache.filter(c => c.type == 'text').size} ${lang.servi.text}\n${message.guild.channels.cache.filter(c => c.type == 'voice').size} ${lang.servi.voice}`, true)
			.addField(`${lang.servi.rolls}:`, message.guild.roles.cache.size, true)
			.addField(`${lang.servi.emot}:`, message.guild.emojis.cache.size, true)
			.setThumbnail(message.guild.iconURL())
			.setTimestamp(new Date(message.guild.createdTimestamp))
			.setFooter(`${lang.servi.timecr}`)
			.setColor('GREEN');
		if(!message.guild.afkChannel) {
			embed.addField(`${lang.servi.afk}:`, 'None', true);
		}
		else{
			embed.addField(`${lang.servi.afk}:`, message.guild.afkChannel.name, true);
		}
		message.delete({ timeout: 1000});
		bot.send(embed);
	}
	catch(err) {
		console.log(`${err.name}\n\n\n:${err.message}\n\n\n:${err.stack}`);
	}
};

module.exports.help = {
	name: 'serverinfo',
	aliases: ['si', 'servinf'],
	description: 'Guild information',
	usage: '.serverinfo',
	noalias: 'No Aliases',
	accessible: '',
	enabled: true
};