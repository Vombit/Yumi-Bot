const rus = require('../assets/language/ru.json');
const eng = require('../assets/language/en.json');
let lang = eng;
module.exports.run = async (bot, message, args) => {
	const fs = require('fs');
	const fff = require('../base/inf.json');
	fff.ut ++;
	fs.writeFile('./base/inf.json', JSON.stringify(fff, null, '\t'), (err)=>{
		if(err) console.log(err);
	});
	if(message.guild.region === 'russia') lang = rus;
	if(message.guild.region != 'russia') lang = eng;
	function duration(ms) {
		const sec = Math.floor((ms / (1000)) % 60).toString();
		const min = Math.floor((ms / (1000 * 60)) % 60).toString();
		const hrs = Math.floor((ms / (1000 * 60 * 60)) % 60).toString();
		const days = Math.floor((ms / (1000 * 60 * 60 * 24)) % 60).toString();
		return `${days.padStart(1, '0')} ${lang.uptime.days}, ${hrs.padStart(2, '0')} ${lang.uptime.hrs}, ${min.padStart(2, '0')} ${lang.uptime.min}, ${sec.padStart(2, '0')} ${lang.uptime.sec}`;
	}
	message.channel.send(`${lang.uptime.send}: ${duration(bot.uptime)}`);
};
module.exports.help = {
	name: 'uptime',
	aliases: ['ut'],
	description: 'Working time Yumi',
	usage: '.uptime',
	noalias: 'No Aliases',
	accessible: '',
	enabled: true
};