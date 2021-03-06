const Discord = module.require('discord.js');
const rus = require('../assets/language/ru.json');
const eng = require('../assets/language/en.json');
let lang = eng;

module.exports = {
	inVoiceChannel: true
};
module.exports.run = async (bot, message, args) => {
	//if (message.guild.id != '400355776717127690')	return message.channel.send('We are sorry, command is not working correctly and we are trying to fix it');
    if(message.author.id != '317598066276565003') return message.channel.send('We are sorry, command is not working correctly and we are trying to fix it');
	if(message.guild.region === 'russia') lang = rus;
	if(message.guild.region != 'russia') lang = eng;

    const queue = args.join(" ")
    if (!queue) return message.channel.send(`${lang.music.valid}`)
    
	if(message.member.voice) {
		let i = 0;
		const searchResult = await bot.distube.search(queue, message.author);
		//console.log(searchResult)
		const tracks = searchResult.slice(0, 10);
		const musicInfo = tracks.map(r => `${++i}) ${r.name} - ${r.url}`).join('\n');

		const embed = new Discord.MessageEmbed()
			.setColor('#d6007a')
			.setAuthor(`Yumi Music 🎵`, bot.user.displayAvatarURL())
			.setDescription(musicInfo)
			//.setFooter(`${lang.music.request} ${song.user.username}`);
		message.channel.send(embed);

		const filter = m => (message.author.id === m.author.id) && (m.content >= 1 && m.content < tracks.length);
		
		try {
			const response = await message.channel
				.awaitMessages(filter, {max: 1, time: 10000, errors: ['time']});

			if (response) {
				const entry = response.first().content;

				const player = bot.distube.get(message.guild.id);
				const track = tracks[entry-1];
				bot.distube.addList(track);
				if(!player.playing) bot.distube.play(message);

			}
		} catch (err) {
			return;
		}


	}

};
module.exports.help = {
	name: 'search',
	aliases: [''],
	description: 'Includes music',
	usage: '.play <request>/<Url>',
	noalias: 'No Aliases',
	accessible: '',
	enabled: true
};