module.exports.run = async (bot, message, args) => {
	const fs = require('fs');
	const fff = require('../base/inf.json');
	fff.deg ++;
	fs.writeFile('./base/inf.json', JSON.stringify(fff, null, '\t'), (err)=>{
		if(err) console.log(err);
	});
	const a = +args[0];
	const b = +args[1];

	if (isNaN(a) || isNaN(b)) return message.channel.send('Enter a number!');
	let res = 1;
	for (let i = 0; i < b; i++) res *= a;
	message.reply(`Decision: *${res}*`);
};

module.exports.help = {
	name: 'degcalc',
	aliases: ['dc', 'degcalc'],
	description: 'Degree calculator.',
	usage: '.dc <number> <degree>',
	noalias: 'No Aliases',
	accessible: '',
	enabled: true
};