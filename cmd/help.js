const Discord = module.require('discord.js');
const rus = require('../assets/language/ru.json');
const eng = require('../assets/language/en.json');
let lang = eng;

module.exports.run = async (bot, message, args) => {
	if(message.guild.region === 'russia') lang = rus;
	if(message.guild.region != 'russia') lang = eng;

	const prefix = '.';

	if (args[0] === 'help') return message.channel.send(`${lang.help.try} **${prefix}help**`);
	if (args[0]) {
		let cmds = args[0];
		if(bot.commands.has(cmds)) {
			cmds = bot.commands.get(cmds);
			const Membed = new Discord.MessageEmbed()
				.setColor('#d60a4c')
				.setAuthor('Yumi Help', bot.user.displayAvatarURL())
				.setDescription(`${lang.help.prefix}: " ${prefix} "\n\n **${lang.use}:** ${cmds.help.name}\n**${lang.help.desc}:** ${cmds.help.description || 'No description'}\n**${lang.help.cmd}:** ${cmds.help.usage || 'No usage'}\n**${lang.help.for}:** ${cmds.help.accessible || 'Everyone'}\n**Aliases:** ${cmds.help.aliases || cmds.help.noalias}\n**${lang.help.status}:** ${cmds.help.enabled || false}`);


			bot.send(Membed);
		}
	}

if (message.guild.id != '400355776717127690') {
	if (!args[0]) {
		const Sembed = new Discord.MessageEmbed()
			.setAuthor('Yumi Help', bot.user.displayAvatarURL())
			.setTitle(`${lang.help.bott}`)
			.setColor('#d60a4c')

			.setTimestamp()
			.setDescription(`${lang.use} \`\`.help <command>\`\` ${lang.help.moreinfo} \n\n `) //${lang.help.first}: \`\`setting\`\` 
			.addField('Yumi:', '``ping``, ``help``, ``error``, ``uptime``')
			.addField(`${lang.help.fun}:`, '``8ball``, ``choose``, ``poll``')
			.addField(`${lang.help.manage}:`, '``clear``,  ``yumisay``')
			.addField(`${lang.help.utils}:`, '``avatar``,  ``userinfo``, ``serverinfo``')
			.addField(`${lang.help.links}:`, ' [invite Yumi](https://discordapp.com/oauth2/authorize?&client_id=643676300879331359&scope=bot&permissions=8),  [Support server](https://discord.gg/5xMZ3zA)');
		bot.send(Sembed);
	}
}else{
	if (!args[0]) {
		const Sembed = new Discord.MessageEmbed()
				.setAuthor('Yumi Help', bot.user.displayAvatarURL())
				.setTitle(`${lang.help.bott}`)
				.setColor('#d60a4c')

				.setTimestamp()
				.setDescription(`${lang.use} \`\`.help <command>\`\` ${lang.help.moreinfo} \n\n `) //${lang.help.first}: \`\`setting\`\` 
				.addField('Yumi:', '``ping``, ``help``, ``error``, ``uptime``')
				.addField(`${lang.help.fun}:`, '``8ball``, ``choose``, ``poll``')
				.addField(`${lang.help.manage}:`, '``clear``,  ``yumisay``')
				.addField(`Музыка:`, '``play/stop``, ``pause/resume``, ``volume``, ``next``, ``loop``, ``filter``, ``autoplay``, ``rewind``, ``queue``, ``shuffle`` ')
				.addField(`${lang.help.utils}:`, '``avatar``, ``userinfo``, ``serverinfo``')	
		
				.setFooter('Yumi', bot.user.displayAvatarURL());
		bot.send(Sembed);
	}

}

	// , ``vote`` ``invite``, 
	// , ``changepref``, ``setHi``, ``setBye``
	//
	//
	// , ``mute/unmute``, ``ban/unban`` ``setting``, ,``kick``, ``softban``, ``report``
	//``guildroles``, 
	//
};
module.exports.help = {
	name: 'help',
	aliases: ['h'],
	description: '',
	usage: '.usage',
	noalias: 'No Aliases',
	accessible: 'all',
	enabled: true
};
