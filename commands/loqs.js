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
          let loqsEmbed = new client.disc.MessageEmbed()
          .setColor("E74C3C")
          .setTitle("__Loqs__")
          .setDescription("There's no loqs channel!")
          .setTimestamp()
          .setFooter(message.author.tag, message.author.avatarURL({dynamic: true}));
          return message.channel.send(loqsEmbed)
        } else {
          let loqsEmbed = new client.disc.MessageEmbed()
          .setColor("E74C3C")
          .setTitle("__Loqs__")
          .setDescription(`The loqs channel is ${defaultLoqs}`)
          .setTimestamp()
          .setFooter(message.author.tag, message.author.avatarURL({dynamic: true}));
          return message.channel.send(loqsEmbed)
        }
      }  else {
        if (message.guild.channels.cache.get(loqsDatabase[message.guild.id]) == undefined) {

          let loqsEmbed = new client.disc.MessageEmbed()
          .setColor("E74C3C")
          .setTitle("__Loqs__")
          .setDescription(`The loqs channel is ${defaultLoqs}`)
          .setTimestamp()
          .setFooter(message.author.tag, message.author.avatarURL({dynamic: true}));
        return message.channel.send(loqsEmbed)
        }
        let loqsEmbed = new client.disc.MessageEmbed()
          .setColor("E74C3C")
          .setTitle("__Loqs__")
          .setDescription(`The loqs channel is <#${loqsDatabase[message.guild.id]}>`)
          .setTimestamp()
          .setFooter(message.author.tag, message.author.avatarURL({dynamic: true}));
        return message.channel.send(loqsEmbed)
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
    let loqsEmbed = new client.disc.MessageEmbed()
        .setColor("E74C3C")
        .setTitle("Error")
        .setDescription("Please mention a valid channel")
        .setTimestamp()
        .setFooter(message.author.tag, message.author.avatarURL({dynamic: true}));
    return message.channel.send(loqsEmbed);
  }     
};
