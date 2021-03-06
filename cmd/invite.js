const Discord = module.require('discord.js');
const rus = require('../assets/language/ru.json');
const eng = require('../assets/language/en.json');
let lang = eng;

module.exports.run = async (bot, message, args) => {
	const fs = require('fs');
	const fff = require('../base/inf.json');
	fff.inv ++;
	fs.writeFile('./base/inf.json', JSON.stringify(fff, null, '\t'), (err)=>{
		if(err) console.log(err);
	});
	if(message.guild.region === 'russia') lang = rus;
	if(message.guild.region != 'russia') lang = eng;

	const embed = new Discord.MessageEmbed()
		.setColor('#d60a4c')
		.setAuthor('Yumi Bot', bot.user.displayAvatarURL())
		.setTitle(`${lang.invYumi}`)
		.setURL('https://discordapp.com/oauth2/authorize?&client_id=643676300879331359&scope=bot&permissions=8');
	message.channel.send(embed);
};
module.exports.help = {
	name: 'invite',
	aliases: ['inv'],
	description: 'Invite Yumi to a server',
	usage: '.invite',
	noalias: 'No Aliases',
	accessible: '',
	enabled: true
};