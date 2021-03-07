const rus = require('../assets/language/ru.json');
const eng = require('../assets/language/en.json');
let lang = eng;
module.exports.run = async (bot, message, args) => {
	if(message.guild.region === 'russia') lang = rus;
	if(message.guild.region != 'russia') lang = eng;

	let ag = args[0];
	if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(`${lang.permsuser}`);
	if(!message.guild.me.hasPermission('READ_MESSAGE_HISTORY' || 'MANAGE_MESSAGES')) return message.channel.send(`${lang.permsbot}`);
	if(!ag) return message.reply('Number of messages to delete.');
	if(ag > 99) return message.reply(`${lang.clear.max}`);
	if(ag < 1) return message.reply(`${lang.clear.sel}`);
	ag++;
	message.channel.bulkDelete(ag--).then(() => {
		message.channel.send(`${lang.clear.cl} ${ag--} ${lang.clear.msg}.`).then(msg => msg.delete({timeout: 2 * 1000}));
	});

};
module.exports.help = {
	name: 'clear',
	aliases: ['cl'],
	description: 'Delete X messages',
	usage: '.clear <count>',
	noalias: 'No Aliases',
	accessible: 'MANAGE_MESSAGES',
	enabled: true
};