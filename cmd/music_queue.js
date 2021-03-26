const Discord = module.require('discord.js');
const rus = require('../assets/language/ru.json');
const eng = require('../assets/language/en.json');
let lang = eng;

module.exports = {
	inVoiceChannel: true
};
module.exports.run = async (bot, message, args) => {
	if(message.guild.region === 'russia') lang = rus;
	if(message.guild.region != 'russia') lang = eng;
	const queue = bot.distube.getQueue(message)
	if (!queue) return message.channel.send(`❌ | ${lang.music.stop} | ❌`)

	if(queue){
		let currentpage = 0;
		const embeds = generateQueueEmbed(queue.songs);
		const queueEmb = await message.channel.send(`${lang.music.current} ${currentpage+1}/${embeds.length}`, embeds[currentpage]);
		await queueEmb.react('⬅️');
		await queueEmb.react('➡️');
		await queueEmb.react('❌');

		const filter = (reaction, user) => ['⬅️', '➡️', '❌'].includes(reaction.emoji.name) && (message.author.id === user.id);
		const collector = queueEmb.createReactionCollector(filter)

		collector.on('collect', async (reaction, user) => {
			if(reaction.emoji.name === '➡️') {
				if(currentpage < embeds.length-1) {
					currentpage++;
					queueEmb.edit(`${lang.music.current} ${currentpage+1}/${embeds.length}`, embeds[currentpage]);
				}
			} else if (reaction.emoji.name === '⬅️') {
				if (currentpage !== 0) {
					--currentpage;
					queueEmb.edit(`${lang.music.current} ${currentpage+1}/${embeds.length}`, embeds[currentpage]);
				}
			} else {
				collector.stop();
				await queueEmb.delete();
			};
		});
	};
	function generateQueueEmbed(queue) {
		const embeds = [];
		let k = 10;
		for(let i = 0; i <queue.length; i+=10) {
			const current = queue.slice(i, k);
			//console.log(current)
			let j = i;
			k += 10;
			const info = current.map(song => `${++j}) \`${song.name}\` `).join('\n'); 
			const embed = new Discord.MessageEmbed()
				.setColor('#d6007a')
				.setAuthor(`Yumi Music 🎵`, bot.user.displayAvatarURL())
				.setThumbnail(message.guild.iconURL())
				.setDescription(`:musical_note: **${lang.music.playing}**  \`${queue[0].name}\` - \`${queue[0].formattedDuration}\` \n${info}`)
				.setFooter(`${lang.music.request} ${message.author.username}`);
			embeds.push(embed)
		}
		return embeds
	}
};
module.exports.help = {
	name: 'queue',
	aliases: ['q'],
	description: 'View the song queue',
	usage: '.queue',
	noalias: 'No Aliases',
	accessible: '',
	enabled: true
};
