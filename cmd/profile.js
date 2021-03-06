// eslint-disable-next-line no-unused-vars
const Discord = module.require('discord.js');
const profile = require('../base/profile.json');
const Jimp = require('jimp');

module.exports.run = async (bot, message, args) => {

	const toView = message.guild.member(message.mentions.users.first()) || message.guild.member(message.author);
	//const toView = message.guild.member(message.author) || message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

	if (!(profile[toView.id].background)) profile[toView.id].background = "fon1.png";

	Jimp.read('./assets/photos/back.png').then(async function(back) {
	Jimp.read(toView.user.avatarURL({format: 'png'})).then(async function(avatar) {
	Jimp.read(`./assets/photos/` + profile[toView.id].background).then(async function(image) {
	Jimp.read('./assets/photos/assets_1.png').then(async function(repi) {
	Jimp.read('./assets/photos/assets_3.png').then(async function(lvl) {
	Jimp.loadFont('./assets/fonts/2.fnt').then(function(fontR) {
	Jimp.loadFont('./assets/fonts/cyber.fnt').then(function(cyber) {
	Jimp.loadFont('./assets/fonts/1.fnt').then(function(font3) {
			avatar.resize(148, 148);
			back.composite(avatar, 36, 70);
			image.resize(512, 512);
			back.composite(image, 0, 0);
			repi.resize(60, 60);
			back.composite(repi, 440, 16);
			const wid = 520 / 100;
			const userWidth = wid / profile[toView.id].maxs * profile[toView.id].xp;
			back.composite(lvl, (-wid * 100) + (userWidth * 100), 388);
									
			back.print(cyber, 190, 170, `${toView.user.username}`);

			if(profile[toView.id].rep > 9) {back.print(fontR, 447, 24, `${profile[toView.id].rep}`);
			}else{back.print(fontR, 457, 24, `${profile[toView.id].rep}`);}

			back.print(font3, 36, 225, `Level: ${profile[toView.id].lvl}`);
			back.print(font3, 36, 260, `Score: ${profile[toView.id].score}`);
			back.print(font3, 36, 295, `Coins: ${profile[toView.id].coins}`);
			back.print(font3, 36, 330, 'Global Rank: coming soon...');
			back.print(font3, 200, 440, `${profile[toView.id].xp}/${profile[toView.id].maxs}`);

			const outputFile = './assets/fon/' + `${toView.user.username}` + toView.user.discriminator + 'YumiBot.' + back.getExtension();
			back.write(outputFile, function() {
				message.channel.send({ files: [outputFile] }).then(function() {});
			});
	});
	});
	});
	});
	});
	});
	});
	});
};
module.exports.help = {
	name: 'profile',
	aliases: ['p', 'prof'],
	description: 'View your / someone else\'s profile',
	usage: '.profile <@user>',
	noalias: 'No Aliases',
	enabled: true
};