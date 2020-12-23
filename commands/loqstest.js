exports.run = (client, message, args) => {
    const fs =  require("fs-extra");
    let loqsDatabase = require("../database/loqs.json");
 
   if (!message.member.hasPermission("MANAGE_MESSAGES")) {
         let errorEmbed = new client.disc.MessageEmbed()
           .setFooter(`${message.author.tag}`, `${message.author.avatarURL({dynamic: true})}`)
           .setTimestamp()
           .setColor("E74C3C")
           .setTitle("403 Forbidden")
           .setDescription("You don't have permission to use that command!");
         message.channel.send(errorEmbed);
         return;
       };
 
 
   var channelID = /\d+/.exec(message.content);
   let defaultLoqs = message.guild.channels.cache.find(channel => channel.name === "loqs")
     if (channelID === null) {
 
       if (!loqsDatabase[message.guild.id]) {
 
         if (!defaultLoqs) {
           return message.channel.send("There's no loqs channel!")
         } else {
           return message.channel.send(`The loqs channel is ${defaultLoqs}`)
         }
       }  else {
         return message.channel.send(`The loqs channel is <#${loqsDatabase[message.guild.id]}>`)
       }
 
     } else {
         var channelID = channelID.toString()
     }
 
    let channel = client.channels.cache.get(channelID)
 
    if (channel) {
     loqsDatabase[message.guild.id] = channelID
 
     fs.writeFile(
       "./database/loqs.json",
       JSON.stringify(loqsDatabase),
       function(err) {
         if (err) return console.error(`Somethinq qone G in updatinq how much G's was posted with an user: ${err}`);
       }
     );
 
     let loqsEmbed = new client.disc.MessageEmbed()
         .setColor("E74C3C")
         .setTitle("200 OK")
         .setDescription(`Chanqed loqs channel to ${channel}`)
         .setTimestamp()
         .setFooter(message.author.tag, message.author.avatarURL({dynamic: true}));
  
     message.channel.send(loqsEmbed);
 
    } else {
      return message.channel.send("Please mention a valid channel");
    }     
 };
 