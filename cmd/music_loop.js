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
        let mode = null
        switch (args[0]) {
            case "off":
                mode = 0
                break
            case "song":
                mode = 1
                break
            case "queue":
                mode = 2
                break
        }
        mode = bot.distube.setRepeatMode(message, mode)
        mode = mode ? mode === 2 ? `${lang.music.repeat.queue}` : `${lang.music.repeat.song}` : `${lang.music.repeat.off}`
      
        const embed = new Discord.MessageEmbed()
			.setColor('#DC143C')
            .setDescription(`${lang.music.repeat.set} \`${mode}\``)
		message.channel.send(embed);
        

};
module.exports.help = {
	name: 'loop',
	aliases: ['rp'],
	description: 'Enables playlist repetition',
	usage: '.loop',
	noalias: 'No Aliases',
	accessible: '',
	enabled: true
};
