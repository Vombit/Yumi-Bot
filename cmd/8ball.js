const Discord = module.require('discord.js');
const rus = require('../assets/language/ru.json');
const eng = require('../assets/language/en.json');
let lang = eng;

module.exports.run = async (bot, message, args) => {

	if(message.guild.region === 'russia') lang = rus;
	if(message.guild.region != 'russia') lang = eng;

	if (!args[0]) return message.reply(`${lang.balls.warn}.`);
	message.delete();
	const replies = lang.balls.replies;
	const result = Math.floor((Math.random() * replies.length));

	const question = args.slice(0).join(' ');
	if(question === '8ball') replies[result] = 'What?';

	const embed = new Discord.MessageEmbed()
		.setAuthor(message.author.tag)
		.setColor('#0ff00')
		.addField(`${lang.balls.quest}:`, question)
		.addField(`${lang.balls.reply}:`, replies[result]);

	bot.send(embed);
};
module.exports.help = {
	name: '8ball',
	aliases: ['8b'],
	description: 'I will answer any question',
	usage: '.8ball <question>',
	noalias: 'No Aliases',
	accessible: '',
	enabled: true
};