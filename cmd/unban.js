const Discord = module.require("discord.js");
let base = require('../base/guilds.json');
let rus = require('../assets/language/ru.json');
let eng = require('../assets/language/en.json');
let lang = eng;
module.exports.run = async (bot,message,args) => {

    if(message.guild.region === 'russia') lang = rus;
    if(message.guild.region != 'russia') lang = eng;

    if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(`${lang.permsuser}`);
    if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send(`${lang.permsbot}`);

    let bannedMember = await bot.fetchUser(args[0])
    if(!bannedMember) return message.channel.send(`${lang.manage.unban.unban}`)

    let reason = args.slice(1).join(" ");
    if (!reason) return message.channel.send(`${lang.selectReason}`);

    try{
        message.guild.unban(bannedMember, {reason: reason})
        message.channel.send(`${bannedMember.tag} ${lang.manage.unban.guilds}`)
    } catch (err){
        console.log(e.message)
    }
    let embed = new Discord.RichEmbed()
        .setColor("#FF1111")
        .setAuthor(`Yumi Logs`, bot.user.displayAvatarURL)
        .addField(`${lang.manage.command}`, "unban")
        .addField(`${lang.manage.user}`, us.user.username)
        .addField(`${lang.manage.moder}`, message.author.username)
        .addField(`${lang.manage.reass}`, reason)
        .setTimestamp()

    let chans = base[message.guild.id].logsChannel;
    let rChannel =message.guild.channels.find(c => c.name === chans)
    if(!base[message.guild.id].logsChannel) {return;}else if(rChannel === null){return;}else{rChannel.send(embed)}
};

module.exports.help = {
    name: "unban",
    aliases: ["ub"],
    description: "Unban user guilds",
    usage: ".unban <@user> <reason>",
    noalias: "No Aliases",
    accessible: "ADMINISTRATOR",
    enabled: true
};