exports.run = (client, message, args) => {
  if (args.join(" ")) return;
  let supertag = client.user.fetch("478823932913516544").tag; // k this doesnt work so its unused rn pls fix
  let creditsEmbed = new client.disc.MessageEmbed()
    .setColor("E74C3C")
    .setTitle("__**Credits**__")
    .addField(
      "**G Detector**",
      `Superchupu#5249\nIndex#8155\nSenko#2137`,
      true
    )
    .addField(
      "**Loqs**",
      `Superchupu#5249\nDice(disableMentions = true)#2213\nIndex#8155\nSenko#2137`,
      true
    )
    .addField(
      `**${client.config.prefix}help ${client.config.prefix}h ${client.config.prefix}info\n${client.config.prefix}invite ${client.config.prefix}vote**`,
      "Superchupu#5249",
      true
    )
    .addField(
      `**${client.config.prefix}eval\nCustom Status\nCode Optimization\nLogo**`,
      "Index#8155",
      true
    )
    .addField(
      `**${client.config.prefix}raidmode\nRaidmode\nGeneral Code Improvemts\n ${client.config.prefix}links**`,
      "Senko#2137",
      true
    )
    .addField(
      "**Special Thanks**",
      "**Lunah#0069** for the G Detector idea\n**Raziel#0072 & Nyx#7241** for creating G.A.S\n**hhhhhh#3720** for helping us with h!removed",
      true
    )
    .setTimestamp() // ok this is almost unreadable xd
    .setFooter(`${message.author.tag}`, `${message.author.avatarURL()}`);
  message.channel.send(creditsEmbed);
};
