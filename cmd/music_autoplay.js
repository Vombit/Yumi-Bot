const Discord = module.require('discord.js');
const rus = require('../assets/language/ru.json');
const eng = require('../assets/language/en.json');
let lang = eng;


module.exports = {
	inVoiceChannel: true
};
module.exports.run = async (bot, message, args) => {
	if (message.guild.id != '400355776717127690')	return message.channel.send('We are sorry, command is not working correctly and we are trying to fix it');
	//if(message.author.id != '317598066276565003') return message.channel.send('We are sorry, command is not working correctly and we are trying to fix it');
	if(message.guild.region === 'russia') lang = rus;
	if(message.guild.region != 'russia') lang = eng;

	let mode = bot.distube.toggleAutoplay(message);
	
	const embed = new Discord.MessageEmbed()
		.setColor('#008000')
        .setDescription(`${lang.music.autoplay} \`${(mode ? "On" : "Off")}\` `)
	message.channel.send(embed);

};

module.exports.help = {
	name: 'autoplay',
	aliases: ['ap', 'autop'],
	description: 'Enabling automatic music selection',
	usage: '.autoplay',
	noalias: 'No Aliases',
	accessible: '',
	enabled: true
};