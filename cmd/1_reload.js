module.exports.run = async (bot, message, args) => {
	if(message.author.id != '317598066276565003') return;// message.channel.send('Ты не мой хозяин');
	if(!args[0]) return message.channel.send('выбери команду');
	const cmdName = args[0].toLowerCase();
	try {
		delete require.cache[require.resolve(`./${cmdName}.js`)];
		bot.commands.delete(cmdName);
		const pull = require(`./${cmdName}.js`);
		bot.commands.set(cmdName, pull);
	}
	catch (e) {
		return message.channel.send(`Не могу перезагрузить: \`${args[0].toUpperCase()}\``);
	}

};

module.exports.help = {
	name: 'reload',
	aliases: ['rl'],
	description: 'f',
	usage: '.',
	noalias: 'No Aliases',
	accessible: '',
	enabled: true
};