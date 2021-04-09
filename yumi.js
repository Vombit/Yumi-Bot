const Discord = require('discord.js');
const rus = require('./assets/language/ru.json');
const eng = require('./assets/language/en.json');
let lang = eng;
const bot = new Discord.Client({ disableMentions: 'everyone' });
//const { prefix, token, dbl_tok } = require('./botconfig.json');

var prefix = process.env.prefix;
var token = process.env.token;
const fs = require('fs');
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();


const DisTube = require('distube');

bot.distube = new DisTube(bot, { searchSongs: false, emitNewSongOnly: true, leaveOnFinish: true })



fs.readdir('./cmd/', (err, files) => {
	if(err) console.log(err);
	const jsfile = files.filter(f => f.split('.').pop() === 'js');
	// eslint-disable-next-line no-unused-vars
	jsfile.forEach((f, i) => {
		const pull = require(`./cmd/${f}`);
		bot.commands.set(pull.help.name, pull);
		pull.help.aliases.forEach(alias => {
			bot.aliases.set(alias, pull.help.name);
		});
	});
});

// botReady
bot.on('ready', async () => {
	console.log(`Приветик, всё в норме`);

});
// /botReady

// messageStates

bot.on('message', async message => {
	
	if(message.author.bot || message.channel.type === 'dm') return;


	// const userid = message.author.id;
	const messageArray = message.content.split(/ +/);
	const command = messageArray[0].toLowerCase();
	const args = messageArray.slice(1);

	// let prefix = base[message.guild.id].prefix;
	if(!message.content.startsWith(prefix)) return;
	const cmf = bot.commands.get(command.slice(prefix.length)) || bot.commands.get(bot.aliases.get(command.slice(prefix.length)));

	if(cmf) cmf.run(bot, message, args);
	bot.rUser = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
	bot.uId = message.author.id;
});
// /messageStates



const status = queue => `Volume: \`${queue.volume}%\` | Filter: \`${queue.filter || "Off"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode === 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``




bot.distube.on("initQueue", queue => {
	queue.autoplay = false;
	queue.volume = 25;
});

bot.distube
	.on("playSong", (message, queue, song) => {
		const embed = new Discord.MessageEmbed()
			.setColor('#d6007a')
			.setAuthor(`Yumi Music 🎵`, bot.user.displayAvatarURL())
			.setThumbnail(message.guild.iconURL())
			.setDescription(`:musical_note: **${lang.music.playing}**  \`${song.name}\` - \`${song.formattedDuration}\` `)
			.addFields(
				{ name: 'Volume', value: ` \`${queue.volume}%\` `, inline: true },
				{ name: 'Filter', value: ` \`${queue.filter || "Off"}\` `, inline: true },
				{ name: 'Loop', value: ` \`${queue.repeatMode ? queue.repeatMode === 2 ? "All Queue" : "This Song" : "Off"}\` `, inline: true },
				{ name: 'Autoplay', value: ` \`${queue.autoplay ? "On" : "Off"}\` `, inline: true },
				{ name: '\u200b', value:'\u200b', inline: true },
				{ name: '\u200b', value:'[url song]('+`${song.url}`+')', inline: true },
			)
			.setTimestamp()
			.setFooter(`${lang.music.request} ${song.user.username}`);
		message.channel.send(embed);
	})
	.on("addSong", (message, queue, song) => {
		const embed = new Discord.MessageEmbed()
			.setColor('#d6007a')
			.setAuthor(`Yumi Music 🎵`, bot.user.displayAvatarURL())
			//.setThumbnail(message.guild.iconURL())
			.setDescription(`**Added:**  \`${song.name}\` - \`${song.formattedDuration}\` `)
			.addFields(
				{name: '\u200b', value:'[url song]('+`${song.url}`+')', inline: true},
				{name: '\u200b', value:'\u200b', inline: true},
				{name: '\u200b', value:'\u200b', inline: true},
			)
			.setTimestamp()
			.setFooter(`Queue by: ${song.user.username}`);
		message.channel.send(embed);
	})


    .on("playList", (message, queue, playlist, song) => message.channel.send(
        `▶️ | Play \`${playlist.title}\` playlist (${playlist.total_items} songs).\nRequested by: ${song.user}\nNow playing \`${song.name}\` - \`${song.formattedDuration}\`\n${status(queue)}`
    ))
    .on("addList", (message, queue, playlist) => message.channel.send(
        `☑️ | Added \`${playlist.title}\` playlist (${playlist.total_items} songs) to queue\n${status(queue)}`
    ))
    // DisTubeOptions.searchSongs = true
    .on("searchResult", (message, result) => {
        let i = 0
        message.channel.send(`**Choose an option from below**\n${result.map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``).join("\n")}\n*Enter anything else or wait 60 seconds to cancel*`)
    })
    // DisTubeOptions.searchSongs = true
    .on("searchCancel", message => message.channel.send(`❌ | Searching canceled`))
    .on("error", (message, err) => message.channel.send(`❌ | An error encountered: ${err}`))


	.on("finish", message => message.channel.send("No more song in queue"))
	.on("empty", message => message.channel.send("Channel is empty. Leaving the channel"));


	// DisTubeOptions.searchSongs = true
//distube.on("searchCancel", (message) => message.channel.send(`Searching canceled`));



bot.on('error', error => {
	console.error('The websocket connection encountered an error:', error);
});
process.on('unhandledRejection', error => {
	console.error('Unhandled promise rejection:', error);
});
process.on('Unhandled', error => {
	console.error('Unhandled promise rejection1:', error);
});


bot.login(token);
