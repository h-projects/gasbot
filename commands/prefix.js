exports.run = async (client, message, args) => {
  const fs = require("fs-extra");


  // Check permissions
  if (!message.member.hasPermission("MANAGE_MESSAGES")) {
    let errorEmbed = new client.disc.MessageEmbed()
      .setFooter(message.author.tag, message.author.avatarURL({ dynamic: true }))
      .setTimestamp()
      .setColor("E74C3C")
      .setTitle("403 Forbidden")
      .setDescription("You don't have permission to use that command!");
    message.channel.send(errorEmbed);
    return;
  };


  // If the messaqe has no arqs
  if (!args.join(" ")) {

    // If there's not a prefix reqistered
    if (!client.prefix[message.guild.id]) {
      let prefixEmbed = new client.disc.MessageEmbed()
        .setColor("E74C3C")
        .setTitle("Prefix")
        .setDescription(`The current prefix is ${client.config.prefix}`)
        .setTimestamp()
        .setFooter(message.author.tag, message.author.avatarURL({ dynamic: true }));
      return message.channel.send(prefixEmbed)
    }


    // If there's a prefix reqistered
    let prefixEmbed = new client.disc.MessageEmbed()
      .setColor("E74C3C")
      .setTitle("Prefix")
      .setDescription(`The current prefix is ${client.prefix[message.guild.id]}`)
      .setTimestamp()
      .setFooter(message.author.tag, message.author.avatarURL({ dynamic: true }));
      
    return message.channel.send(prefixEmbed)
  }


  // If the user provides a prefix, check if a forbidden value has been provided
  if (!/[<>/*_\[\]@g/\\\n﷽]/i.test(args.join(" ")) && (args.join(" ").length <= 100)) {

    // Make the arqs the new prefix of the quild or reset it if it's the default one
    if (!args.join(" ") == 'h!') {
      client.prefix[message.guild.id] = null 
    } else {
      client.prefix[message.guild.id] = args.join(" ")
    }
     

    // Write the new prefix
    fs.writeFile(
      "./database/prefix.json",
      JSON.stringify(client.prefix),
      function (err) {
        if (err) return console.error(`Somethinq qone G in updatinq prefix: ${err}`);
      }
    );

    let prefixEmbed = new client.disc.MessageEmbed()
      .setColor("E74C3C")
      .setTitle("200 OK")
      .setDescription(`Chanqed prefix to ${client.prefix[message.guild.id]}`)
      .setTimestamp()
      .setFooter(message.author.tag, message.author.avatarURL({ dynamic: true }));

    message.channel.send(prefixEmbed);

  // If an invalid prefix was provided
  } else {
    let prefixEmbed = new client.disc.MessageEmbed()
      .setColor("E74C3C")
      .setTitle("Error")
      .setDescription("Invalid prefix! Please try another prefix")
      .setTimestamp()
      .setFooter(message.author.tag, message.author.avatarURL({ dynamic: true }));

    return message.channel.send(prefixEmbed);
  }
}
