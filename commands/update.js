exports.run = (client, message, args) => {
    let ids = ["478823932913516544"];
    let otherIds = ["651511209585147904", "348591272476540928"];

    if (ids.includes(message.author.id)) {
        try {
            
          const shell = require("shelljs");
   
          let updateEmbed = new client.disc.MessageEmbed()
          .setFooter(`${message.author.tag}`, `${message.author.avatarURL({dynamic: true})}`)
          .setTimestamp()
          .setColor("E74C3C")
          .setTitle("200 OK")
          .setDescription("Updatinq the code...");
          message.channel.send(updateEmbed).then(() => { shell.exec("git pull") });
           
         } catch (e) {
           
          let updateEmbed = new client.disc.MessageEmbed()
          .setFooter(`${message.author.tag}`, `${message.author.avatarURL({dynamic: true})}`)
          .setTimestamp()
          .setColor("E74C3C")
          .setTitle("503 Internal Execution Error")
          .setDescription(`There was an error executinq the requested command.\n\`\`\`js\n${e}\n\`\`\``);
          
          message.channel.send(updateEmbed);
           
        }
      } else {
        if (otherIds.includes(message.author.id)) {
            let updateEmbed = new client.disc.MessageEmbed()
            .setFooter(`${message.author.tag}`, `${message.author.avatarURL({dynamic: true})}`)
            .setTimestamp()
            .setColor("E74C3C")
            .setTitle("403 Forbidden")
            .setDescription("For security reasons, only the owner can do that");
        
          return message.channel.send(updateEmbed);
        };
        let updateEmbed = new client.disc.MessageEmbed()
          .setFooter(`${message.author.tag}`, `${message.author.avatarURL({dynamic: true})}`)
          .setTimestamp()
          .setColor("E74C3C")
          .setTitle("403 Forbidden")
          .setDescription("You don't have permission to use that command!");
      
        return message.channel.send(updateEmbed);
    };
      return;
  };