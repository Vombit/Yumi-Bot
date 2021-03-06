const Discord = module.require('discord.js');
const rus = require('../assets/language/ru.json');
const eng = require('../assets/language/en.json');
let lang = eng;
module.exports.run = async (bot, message, args) => {
	//if(message.guild.region === 'russia') lang = rus;
	//if(message.guild.region != 'russia') lang = eng;

	const botmessage = args.join(' ');

	console.log(botmessage);
/*
	message.delete().catch();
	if (!args[0]) return message.reply(`${lang.poll.quest}`);

	const embed = new Discord.MessageEmbed()
		.setColor('#FF1111')
		.setAuthor('Yumi Bot', bot.user.displayAvatarURL())
		.addField(`${lang.poll.send}:`, `${message.author}`)
		.addField(`${lang.poll.poll}:`, botmessage)
		.setTimestamp();

	const pollTopic = await message.channel.send(embed);
	pollTopic.react('⛔');
	pollTopic.react('✅');*/
};
module.exports.help = {
	name: 'poll',
	aliases: ['poll'],
	description: 'Create a poll',
	usage: '.poll <question>',
	noalias: 'No Aliases',
	accessible: '',
	enabled: true
};