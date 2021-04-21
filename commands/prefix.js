exports.run = async (client, message, args) => {
  const fs = require("fs-extra");

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


  if (!args.join(" ")) {

    if (!client.prefix[message.guild.id]) {

      let prefixEmbed = new client.disc.MessageEmbed()
        .setColor("E74C3C")
        .setTitle("__Prefix__")
        .setDescription(`The current prefix is ${client.config.prefix}`)
        .setTimestamp()
        .setFooter(message.author.tag, message.author.avatarURL({ dynamic: true }));
      return message.channel.send(prefixEmbed)
    }

    let prefixEmbed = new client.disc.MessageEmbed()
      .setColor("E74C3C")
      .setTitle("__Prefix__")
      .setDescription(`The current prefix is ${client.prefix[message.guild.id]}`)
      .setTimestamp()
      .setFooter(message.author.tag, message.author.avatarURL({ dynamic: true }));
    return message.channel.send(prefixEmbed)


  }

  if (!/[<>*_\[\]@g/\\\n﷽]/i.test(args.join(" ")) && (args.join(" ").length <= 100)) {
    client.prefix[message.guild.id] = args.join(" ")

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

  } else {
    let prefixEmbed = new client.disc.MessageEmbed()
      .setColor("E74C3C")
      .setTitle("Error")
      .setDescription("Invalid prefix! Please try another prefix")
      .setTimestamp()
      .setFooter(message.author.tag, message.author.avatarURL({ dynamic: true }));
    return message.channel.send(prefixEmbed);
  }
};
