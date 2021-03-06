module.exports.run = async (bot, message, args) => {
	if(message.author.id != '317598066276565003') return;// message.channel.send('Ты не мой хозяин');
	const reason = args.slice(1).join(' ');
	bot.users.cache.get(args[0]).send(reason);
};

module.exports.help = {
	name: 'sayu',
	aliases: ['sayu'],
	description: '',
	usage: '.',
	noalias: 'No Aliases',
	accessible: '',
	enabled: true
};