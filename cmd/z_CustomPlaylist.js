const Discord = module.require('discord.js');
const rus = require('../assets/language/ru.json');
const eng = require('../assets/language/en.json');
let lang = eng;


module.exports = {
	inVoiceChannel: true
};
module.exports.run = async (bot, message, args) => {
	if(message.author.id != '317598066276565003') return message.channel.send('We are sorry, command is not working correctly and we are trying to fix it');
	if(message.guild.region === 'russia') lang = rus;
	if(message.guild.region != 'russia') lang = eng;

	let songs = [
		"Космос нас ждёт Валентин Стрыкало",
		"Ни **я ЩЕНКИ",
		"домой ssshhhiiittt!",
		"Танцы ssshhhiiittt!",
		"Это так архаично Где Фантом?",
		"Плохая привычка nikulin",
		"Снова не успел Снова не успел",
		"Смотрю в глаза Где Фантом?",
		"дети немой страны конец солнечных дней",
		"Восемь ssshhhiiittt!",
		"Разные причины ЩЕНКИ",
		"Кому-то в мире весело Где Фантом?",
		"Иногда Вокруг фонарного столба",
		"Корь Я.СГОРЕЛ.ДВАЖДЫ",
		"На моём велосипеде ssshhhiiittt!",
		"Дикуха Neverlove0",
		"101 пачкасигарет",
		"Уходи, если хочешь ЩЕНКИ",
		"19 ssshhhiiittt!",
		"Подростки пачкасигарет",
		"Секонд-хэнд ssshhhiiittt!",
		"Конец света Вокруг фонарного столба",
		"Кино Вокруг фонарного столба"
	
	];
    bot.distube.playCustomPlaylist(message, songs, { name: "My playlist name" });


};

module.exports.help = {
	name: 'asssd',
	aliases: ['skasdip', 'nextaasd'],
	description: '',
	usage: '.',
	noalias: 'No Aliases',
	accessible: '',
	enabled: true
};