const Discord = require('discord.js');
const rus = require('../assets/language/ru.json');
const eng = require('../assets/language/en.json');
let lang = eng;

module.exports.run = async (bot, message, args) => {

	if(message.guild.region === 'russia') lang = rus;
	if(message.guild.region != 'russia') lang = eng;

	const Invite = await message.guild.channels.cache.find((c) => c.type === 'text').createInvite();
	const Sender = message.author;
	const sayMessage = args.join(' ');
	if(!sayMessage) return message.channel.send(`${lang.err.sel}.`).then(msg => {msg.delete({timeout:5000});});

	const contact = new Discord.MessageEmbed()
		.setColor('#ff0f00')

		.setThumbnail(Sender.displayAvatarURL())
		.setDescription(`[${message.guild.name}](${Invite.url})`)
		.setTitle('Сервер:')
		.addField('Отправитель', Sender, true)
		.addField('Дискриминатор: ', Sender.discriminator, true)
		.addField('ID отправителя: ', Sender.id, true)
		.addField(`${lang.err.prob}:`, sayMessage)
		.setTimestamp();

	bot.channels.cache.get('645495073949089822').send(contact);

	const embed = new Discord.MessageEmbed()
		.setColor('#00ff00')
		.setTitle(`${lang.err.probsend}`)
		.addField(`${lang.err.sender}:`, Sender)
		.addField(`${lang.err.prob}:`, sayMessage)
		.setFooter(`${lang.err.wat}`);

	message.channel.send(embed);


};
module.exports.help = {
	name: 'error',
	aliases: ['err', 'er', 'bug'],
	description: 'Send a bug / wish about the bot',
	usage: '.err <description>',
	noalias: 'No Aliases',
	accessible: '',
	enabled: true
};