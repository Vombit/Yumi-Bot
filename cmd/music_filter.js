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

	const list = new Discord.MessageEmbed()
			.setColor('#D2691E')
            .setDescription('\`\`3d\`\`|\`\`bassboost\`\`|\`\`echo\`\`|\`\`karaoke\`\`|\`\`nightcore\`\`|\`\`vaporwave\`\`|\`\`flanger\`\`|\`\`gate\`\`|\`\`haas\`\`|\`\`reverse\`\`|\`\`surround\`\`|\`\`mcompand\`\`|\`\`phaser\`\`|\`\`tremolo\`\`|\`\`earwax\`\`')
		


    const queue = bot.distube.getQueue(message)
        if (!queue) return message.channel.send(`❌ | ${lang.music.stop} | ❌`)
		if (args[0] === "list") return message.channel.send(list)
        if (args[0] === "off" && queue.filter) bot.distube.setFilter(message, queue.filter)
        else if (Object.keys(bot.distube.filters).includes(args[0])) bot.distube.setFilter(message, args[0])
        else if (args[0]) return message.channel.send(`${lang.music.err}`)
        
		const embed = new Discord.MessageEmbed()
			.setColor('#D2691E')
            .setDescription(`${lang.music.filt} \`${queue.filter || "Off"}\``)
		message.channel.send(embed);
};
module.exports.help = {
	name: 'filter',
	aliases: ['filters', 'f'],
	description: 'Creates an effect on the song (use ".f list")',
	usage: '.filter <effect>',
	noalias: 'No Aliases',
	accessible: '',
	enabled: true
};