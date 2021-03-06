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

    const queue = bot.distube.getQueue(message)
    if (!queue) return message.channel.send(`❌ | ${lang.music.stop} | ❌`)
    const volume = parseInt(args[0])
    if (isNaN(volume)) return message.channel.send(`❌ | ${lang.music.err} | ❌`)
    bot.distube.setVolume(message, volume)
    
	const embed = new Discord.MessageEmbed()
			.setColor('#DC143C')
            .setDescription(`${lang.music.volume} \`${volume}\``)
		message.channel.send(embed);

};
module.exports.help = {
	name: 'volume',
	aliases: ['v', 'set-volume'],
	description: 'Сhange the volume',
	usage: '.volume <count>',
	noalias: 'No Aliases',
	accessible: '',
	enabled: true
};