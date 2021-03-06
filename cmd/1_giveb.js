const profile = require('../base/profile.json');

module.exports.run = async (bot, message, args) => {
	if(message.author.id != '317598066276565003') return; //message.channel.send('Ты не мой хозяин');
	const toView = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0])) || message.guild.member(message.author);
	const con = profile[toView.id].coins;
	const reason = parseInt(args.slice(1).join(' '));
	profile[toView.id].coins = (con + reason);
	message.channel.send(`Бонус дан ${toView} в размере ${reason}`);
};
module.exports.help = {
	name: 'give',
	aliases: ['gv'],
	description: '',
	usage: '.give <@user>',
	noalias: 'No Aliases',
	accessible: '',
	enabled: true
};