const Discord = module.require('discord.js');
const rus = require('../assets/language/ru.json');
const eng = require('../assets/language/en.json');
let lang = eng;
const profile = require('../base/profile.json');
const fons = require('../base/fonsShop.json');
const Jimp = require('jimp');
const fs = require('fs');

module.exports.run = async (bot, message, args) => {
	if(message.guild.region === 'russia') lang = rus;
	if(message.guild.region != 'russia') lang = eng;
	const user = message.author;

	Jimp.read('./assets/photos/shop1.png').then(async function(back) {
	Jimp.loadFont('./assets/fonts/1.fnt').then(function(font3) {
		back.print(font3, 40, 182, `1: ${fons.f1.price}`);
		back.print(font3, 210, 182, `2: ${fons.f2.price}`);
		back.print(font3, 380, 182, `3: ${fons.f3.price}`);
		back.print(font3, 550, 182, `4: ${fons.f4.price}`);
		back.print(font3, 720, 182, `5: ${fons.f5.price}`);
		back.print(font3, 875, 182, `6: ${fons.f6.price}`);
		
		back.print(font3, 35, 422, `7: ${fons.f7.price}`);
		back.print(font3, 205, 422, `8: ${fons.f8.price}`);
		back.print(font3, 375, 422, `9: ${fons.f9.price}`);
		back.print(font3, 545, 422, `10: ${fons.f10.np}`);
		back.print(font3, 710, 422, `11: ${fons.f11.np}`);
		back.print(font3, 870, 422, `12: ${fons.f12.np}`);

		const outputFile = './assets/fon/Shop1.' + back.getExtension();
		back.write(outputFile, function() {
			message.channel.send({ files: [outputFile] }).then(function() {});
		});
	});
	});
	message.channel.send(`${lang.shop.Select}`)

	const collector = new Discord.MessageCollector(
		message.channel,
		(m) => m.author.id === message.author.id,
		{ time: 15000, max: 1 });

	collector.on('collect', (message) => {
		collector.stop();
		ips = `f`+ message.content;
		
		if (profile[message.author.id].coins > fons[ips].price) {
			profile[message.author.id].coins = profile[message.author.id].coins - fons[ips].price;
			message.channel.send(`${lang.shop.UrWel}`);
			profile[message.author.id].background = fons[ips].name;
		} else {
			message.channel.send(`${lang.shop.noMoney}`);
		}



		return;
	});

};

module.exports.help = {
	name: 'shop',
	aliases: ['sh', 's'],
	description: 'You can buy a new background',
	usage: '.shop',
	noalias: 'No Aliases',
	accessible: 'all',
	enabled: true
};