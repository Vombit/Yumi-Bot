module.exports.run = async (bot, message, args) => {
	if(message.author.id != '317598066276565003') return message.channel.send('Ты не мой хозяин');
	try {
		await message.channel.send('Я выключаюсь мой повелитель');
		process.exit();
	}
	catch(e) {
		message.channel.send(`ERROR: ${e.message}`);
	}
};

module.exports.help = {
	name: 'shotdown',
	aliases: ['sdown'],
	description: 'f',
	usage: '.',
	noalias: 'No Aliases',
	accessible: '',
	enabled: true
};