const Discord = module.require("discord.js");
let rus = require('../assets/language/ru.json');
let eng = require('../assets/language/en.json');
let base = require('../base/guilds.json');
const fs = require('fs');
let lang = eng;

module.exports.run = async (bot,message,args) => {
    const fs = require('fs');
	const fff = require('../base/inf.json');
	fff.chgpref ++;
	fs.writeFile('./base/inf.json', JSON.stringify(fff, null, '\t'), (err)=>{
		if(err) console.log(err);
	});
    if(message.guild.region === 'russia') lang = rus;
    if(message.guild.region != 'russia') lang = eng;

    if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(`${lang.permsbot}`);
    //if (!args.join(' ')) return message.channel.send('Set prefix < 4')

    //var yes = "y";
    //message.channel.send(`Are you want to change: y/n`)
    //const sett = new Discord.MessageCollector(message.channel,(m) => m.author.id === message.author.id,{time:10000,max:1});
    //sett.on('collect', (message) => {
        //sett.stop();
        //if (message.content == yes){
            message.channel.send(`Specify the prefix name`);
            const logs = new Discord.MessageCollector(message.channel,(m) => m.author.id === message.author.id,{time:20000,max:1});
            logs.on('collect', (message) => {
                logs.stop();
                base[message.guild.id].prefix = message.content;
                fs.writeFile('./base/guilds.json',JSON.stringify(base, null, '\t'),(err)=>{
                    if(err) console.log(err);});
                    message.channel.send(`Successfully modified`)
            })
         //}else{
         //message.channel.send(`You must be mistaken`);
         //}

//})

};

module.exports.help = {
    name: "changePrefix",
    aliases: ["cp", "changpref"],
    description: "To change the prefix of the bot",
    usage: ".changePrefix",
    noalias: "No Aliases",
    accessible: "",
    enabled: false
};