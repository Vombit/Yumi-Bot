const Discord = module.require('discord.js');
const profile = require('../base/profile.json');
const rus = require('../assets/language/ru.json');
const eng = require('../assets/language/en.json');
let lang = eng;
module.exports.run = async (bot, message, args) => {

	if(message.guild.region === 'russia') lang = rus;
	if(message.guild.region != 'russia') lang = eng;

	function random(low, high) {
		return Math.floor(Math.random() * (high + low + 1) - low);
	}

	const b = random(0, 100);
	const a = random(0, 100);
	const code = a + '+' + b;
	const code2 = (a + b);

	message.channel.send(code + '= ?');
	const collector = new Discord.MessageCollector(
		message.channel,
		(m) => m.author.id === message.author.id,
		{ time: 15000, max: 1 }
	);
	collector.on('collect', (message) => {

		collector.stop();
		if (message.content == code2) {
			profile[message.author.id].coins += 10;
			message.channel.send(`${lang.math.get} **10** coins!`);

		}
		else{
			message.channel.send(`${lang.math.try}`);
		}
		return;
	});
	/* collector.on('end', (c, r) => {
		// console.log('c');
		message.channel.send('Time\'s up');
	});*/
};
module.exports.help = {
	name: 'math',
	aliases: ['math'],
	description: 'For solving a mathematical expression you get ***coins***',
	usage: '.math',
	noalias: 'No Aliases',
	accessible: '',
	enabled: true
};