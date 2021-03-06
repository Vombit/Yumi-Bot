const Discord = module.require("discord.js");
let base = require('../base/guilds.json');
let rus = require('../assets/language/ru.json');
let eng = require('../assets/language/en.json');
const fs = require('fs');
let lang = eng;

module.exports.run = async (bot,message,args) => {
    const fs = require('fs');
	const fff = require('../base/inf.json');
	fff.sett ++;
	fs.writeFile('./base/inf.json', JSON.stringify(fff, null, '\t'), (err)=>{
		if(err) console.log(err);
	});
    if(message.guild.region === 'russia') lang = rus;
    if(message.guild.region != 'russia') lang = eng;

    if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(`${lang.permsuser}`);
    var yes = "y";
    var Yes = "Y";
    var mainch ="";
    message.channel.send(`${lang.settings.yorn}: y/n \n use a **name**  __without extra characters__`)
    const sett = new Discord.MessageCollector(message.channel,(m) => m.author.id === message.author.id,{time:20000,max:1});
    sett.on('collect', (message) => {
        sett.stop();
        if (message.content == yes || Yes){
            message.channel.send(`${lang.settings.hich}`);
            const logs = new Discord.MessageCollector(message.channel,(m) => m.author.id === message.author.id,{time:20000,max:1});
            logs.on('collect', (message) => {
                logs.stop();
                base[message.guild.id].hiChannel = message.content;
                fs.writeFile('./base/guilds.json',JSON.stringify(base, null, '\t'),(err)=>{
                    if(err) console.log(err);});
                message.channel.send(`${lang.settings.logsch}`);
                const hi = new Discord.MessageCollector(message.channel,(m) => m.author.id === message.author.id,{time:20000,max:1});
                hi.on('collect', (message) => {
                    hi.stop();
                    base[message.guild.id].logsChannel = message.content;
                    fs.writeFile('./base/guilds.json',JSON.stringify(base, null, '\t'),(err)=>{
                        if(err) console.log(err);});
                    message.channel.send(`${lang.settings.thx}`)
                })
            })
         }else{
         message.channel.send(`${lang.settings.can}`);
         }
         sett.on('end', (c, r) => {
            // console.log('c');
            message.channel.send("Time's up");
        });
})


};
module.exports.help = {
    name: "setting",
    aliases: ["set"],
    description: "Perform the configuration for the correct operation of the bot",
    usage: ".setting",
    noalias: "No Aliases",
    accessible: "",
    enabled: true
};