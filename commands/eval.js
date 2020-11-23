exports.run = (client, message, args) => {
  let ids = ["478823932913516544", "651511209585147904", "348591272476540928"];
  
  if (message.guild.id === "720009823458033705" &&
      !args.join(" ").includes("ban") &&
      !args.join(" ").includes("kick") &&
      !args.join(" ").includes("token") &&
      !args.join(" ").includes("TOKEN") &&
      !args.join(" ").includes("TOPGGTOKEN") &&
      !args.join(" ").includes("config.json") &&
      ids.includes(message.author.id)) {
      try {
 
        let evaled = eval(args.join(" "));
        let evalEmbed = new client.disc.MessageEmbed()
        .setFooter(`${message.author.tag}`, `${message.author.avatarURL({dynamic: true})}`)
        .setTimestamp()
        .setColor("E74C3C")
        .setTitle("200 OK")
        .setDescription(`\`\`\`js\n${evaled}\n\`\`\``);

        message.channel.send(evalEmbed);
         
       } catch (e) {
         
        let evalEmbed = new client.disc.MessageEmbed()
        .setFooter(`${message.author.tag}`, `${message.author.avatarURL({dynamic: true})}`)
        .setTimestamp()
        .setColor("E74C3C")
        .setTitle("503 Internal Execution Error")
        .setDescription(`There was an error executinq the requested evaluation.\n\`\`\`js\n${e}\n\`\`\``);
        
        message.channel.send(evalEmbed);
         
      }
    } else {
      
      let evalEmbed = new client.disc.MessageEmbed()
        .setFooter(`${message.author.tag}`, `${message.author.avatarURL({dynamic: true})}`)
        .setTimestamp()
        .setColor("E74C3C")
        .setTitle("403 Forbidden")
        .setDescription("You do not have permission to use that command!");
    
      return message.channel.send(evalEmbed);
  } else
    return;
};
