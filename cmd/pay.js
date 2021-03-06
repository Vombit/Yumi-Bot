const rus = require('../assets/language/ru.json');
const eng = require('../assets/language/en.json');
let lang = eng;
const profile = require('../base/profile.json');

module.exports.run = async (bot, message, args) => {
	const fs = require('fs');
	const fff = require('../base/inf.json');
	fff.pay ++;
	fs.writeFile('./base/inf.json', JSON.stringify(fff, null, '\t'), (err)=>{
		if(err) console.log(err);
	});

	if(message.guild.region === 'russia') lang = rus;
	if(message.guild.region != 'russia') lang = eng;

	if (isNaN(args[1])) {
		message.channel.send(`${lang.pay.err}`);
		return;
	}
	const pUser = message.mentions.users.first() || message.guild.members.get(args[0]);

	if(pUser.bot) return message.channel.send(`${lang.pay.vb}.`);

	if(!profile[pUser.id].coins) {
		profile[pUser.id] = {
			coins: 0
		};
	}
	const pCoins = profile[pUser.id].coins;
	const sCoins = profile[message.author.id].coins;

	if(sCoins < args[1]) return message.reply(`${lang.pay.ncoins}`);

	profile[message.author.id].coins = (parseInt(sCoins) - parseInt(args[1]));
	profile[pUser.id].coins = (parseInt(pCoins) + parseInt(args[1]));

	message.channel.send(`${message.author} ${lang.pay.gv} ${pUser} ${args[1]} 💸.`);
};

module.exports.help = {
	name: 'pay',
	aliases: ['pay'],
	description: 'Pay for user',
	usage: '.pay <@user> <count>',
	noalias: 'No Aliases',
	accessible: 'all',
	enabled: true
};