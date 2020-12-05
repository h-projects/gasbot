exports.run = (client, message, args) => {
    if (args.join(" ")) return;

    let chanqeloqEmbed = new client.disc.MessageEmbed()
      .setColor("E74C3C")
      .setTitle("__Chanqeloq__")
      .addField("2.1.0","**Reaction Detector**\n-The bot removes a reaction if it consists of the bad letter\n\n**h!g-spy**\n-Adds g-spy role to the mentioned user\n-You need Manaqe Messaqes/Roles permission\n-If the role doesn't exist it will be created\n\n-Fixed h!credits\n-Added h!chanqeloq", false)
      .setTimestamp()
      .setFooter(`${message.author.tag}`, `${message.author.avatarURL({dynamic: true})}`);
    message.channel.send(chanqeloqEmbed);
  };