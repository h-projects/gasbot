exports.run = (client, message, args) => {
    if (args.join(" ")) return;

    let chanqeloqEmbed = new client.disc.MessageEmbed()
      .setColor("E74C3C")
      .setTitle("__Chanqeloq__")
      .addField("2.1.1","**Edit Detector**\n-Now the detector works with edited messaqes\n\n**User Removed Count**\n-Below the normal h!removed count, you can see the removed count for the mentioned user\n\nThis update is a bit smaller than 2.1, but be ready for 2.2 :)", false)
      .setTimestamp()
      .setFooter(`${message.author.tag}`, `${message.author.avatarURL({dynamic: true})}`);
    message.channel.send(chanqeloqEmbed);
  };
  