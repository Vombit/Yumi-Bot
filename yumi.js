const Discord = require('discord.js');
const rus = require('./assets/language/ru.json');
const eng = require('./assets/language/en.json');
let lang = eng;
const bot = new Discord.Client({ disableMentions: 'everyone' });
const profile = require('./base/profile.json');
const base = require('./base/guilds.json');
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
	const statuses = [
		'Yumi | .help',
		'Use .help',
		'New command "shop"',
		'Have a nice day.',
	];
	setInterval(function() {
		const status = statuses[Math.floor(Math.random() * statuses.length)];
		bot.user.setActivity(status, { type: 'WATCHING' });
	}, 15 * 1000);
});
// /botReady

// messageStates

bot.on('message', async message => {
	
	// log_dm_mess
	if (message.channel.type === 'dm') {
		if(message.author.bot) return;
		bot.channels.cache.get('814852912052306011').send(
			new Discord.MessageEmbed()
				.setTitle('Сообщение от ' + message.author.tag + ` [${message.author.id}]`)
				.setDescription(message.content)
				.setTimestamp()
				.setColor('ff6600'),
		);
		message.reply('Sorry, but I can not answer in private conversations (if you want to ask a question, then join the support channel) \n https://discord.gg/5xMZ3zA');
	}
	// /log_dm_mess
	if(message.author.bot || message.channel.type === 'dm') return;
	// lvlUpSet
	const mai = message.author.id;
	const username = message.author.username;
	bot.send = function(msg) {message.channel.send(msg);};
	const aaddxp = Math.floor(Math.random() * 5) + 3;
	if(!profile[mai]) {
		profile[mai] = {
			username:username,
			coins:200,
			lvl:1,
			xp:0,
			maxs:50,
			score:0,
			rep:0,
			background: "fon1.png",
			zero:''
		};
	}

	const us = profile[mai];
	if(message.guild.region === 'russia') lang = rus;
	us.xp += aaddxp;
	us.score++;
	if(us.maxs < us.xp) {
		us.lvl++;
		us.xp = 0;
		us.maxs += 20;
		us.coins += 50;
		const embed = new Discord.MessageEmbed()
			.setColor('RANDOM')
			.setDescription(`${lang.lvl.first} ${us.lvl} ${lang.lvl.second}!`)
			.setFooter(`${message.author.username}`, message.author.avatarURL);
		try{message.channel.send(embed);}
		catch(e) {return;}
	}
	fs.writeFile('./base/profile.json', JSON.stringify(profile, null, '\t'), (err)=>{
		if(err) console.log(err);
	});
	// /lvlUpSet

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
    .on("error", (message, err) => message.channel.send(`❌ | An error encountered: ${err}`));

	//distube.on("finish", message => message.channel.send("No more song in queue"));
	//distube.on("empty", message => message.channel.send("Channel is empty. Leaving the channel"))


	// DisTubeOptions.searchSongs = true
//distube.on("searchCancel", (message) => message.channel.send(`Searching canceled`));





bot.on('guildCreate', async guild =>{
	const gui = guild.id;
	if(!base[gui]) {
		base[gui] = {
			logsChannel:'',
			hiChannel:'',
			on:false,
			zero:'',
			prefix:'.',
			msgHi:'',
			msgBye:'',
		};
	}
	fs.writeFile('./base/guilds.json', JSON.stringify(base, null, '\t'), (err)=>{
		if(err) console.log(err);
	});
});


bot.on('error', error => {
	console.error('The websocket connection encountered an error:', error);
});
process.on('unhandledRejection', error => {
	console.error('Unhandled promise rejection:', error);
});
process.on('Unhandled', error => {
	console.error('Unhandled promise rejection:', error);
});


bot.login(token);