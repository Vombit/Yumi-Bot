const Discord = module.require("discord.js");
const fs = require("fs");
let rus = require('../assets/language/ru.json');
let eng = require('../assets/language/en.json');
let lang = eng;
module.exports.run = async (bot,message,args) => {
    const fs = require('fs');
	const fff = require('../base/inf.json');
	fff.sayb ++;
	fs.writeFile('./base/inf.json', JSON.stringify(fff, null, '\t'), (err)=>{
		if(err) console.log(err);
	});
    if(message.guild.region === 'russia') lang = rus;
    if(message.guild.region != 'russia') lang = eng;

    if(!message.member.hasPermission("MANAGE_MESSAGES" || "ADMINISTRATOR")) return message.channel.send(`${lang.permsuser}`);

    let mChan = message.mentions.channels.first();
    let argsresult;
    message.delete();
	if(!args[0]) return message.channel.send(`Input message`);
    if(mChan) {
        argsresult = args.slice(1).join(" ");
        mChan.send(argsresult)
    } else {
        argsresult = args.join(" ")
        message.channel.send(argsresult)
    }

};
module.exports.help = {
    name: "yumisay",
    aliases: ["say"],
    description: "Ask to write a bot",
    usage: ".yumisay <message> || .yumisay #channel-name <message>",
    noalias: "No Aliases",
    accessible: "",
    enabled: true
};