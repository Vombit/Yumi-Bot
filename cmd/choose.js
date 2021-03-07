const Discord = module.require('discord.js');
const rus = require('../assets/language/ru.json');
const eng = require('../assets/language/en.json');
let lang = eng;

module.exports.run = async (bot, message, args) => {
	if(message.guild.region === 'russia') lang = rus;
	if(message.guild.region != 'russia') lang = eng;

	if(args.length < 2) return message.channel.send(`${lang.choose.min}`);
	if(args.length > 15) return message.channel.send(`${lang.choose.max}`);
	const choosen = Math.floor((Math.random() * args.length));

	const chooseEmb = new Discord.MessageEmbed()
		.setAuthor('Yumi', bot.user.displayAvatarURL())
		.setColor('DARK_GREEN')
		.setDescription(`${lang.choose.mg} **${args.map(u => u.toString()).join(', ') }**... \n---------------------------\n ${lang.choose.ch}: **${args[choosen]}**.`)
		// .setDescription(`${lang.choose.ch}:`, `**${args[choosen]}**.`)
		.setTimestamp();

	message.channel.send(chooseEmb);
};
module.exports.help = {
	name: 'choose',
	aliases: ['ch'],
	description: 'Help in choosing',
	usage: '.choose <q1> <q..> <q15>',
	noalias: 'No Aliases',
	accessible: 'all',
	enabled: true
};