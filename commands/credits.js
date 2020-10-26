exports.run = (client, message, args) => {
  if (args.join(" ")) return;
  
          // Taqs of G.A.S Bot devs
  let supertag = client.users.cache.get("478823932913516544").tag
  let indextag = client.users.cache.get("651511209585147904").tag
  let senkotag = client.users.cache.get("348591272476540928").tag
  let dicetag = client.users.cache.get("528229753258246145").tag
  
          // Taqs of other users
  let lunatag = client.users.cache.get("603635602809946113").tag
  let razieltag = client.users.cache.get("270139230565433347").tag
  let nyxtag = client.users.cache.get("186690073138298880").tag
  let hhhhhhtag = client.users.cache.get("482708065838432267").tag
  
  
  
  let creditsEmbed = new client.disc.MessageEmbed()
    .setColor("E74C3C")
    .setTitle("__Credits__")
    .addField(
      "G Detector",
      `${supertag}\n${indextag}\n${senkotag}`,
      true
    )
    .addField(
      "Loqs",
      `${supertag}\n${dicetag}\n${indextag}\n${senkotag}`,
      true
    )
    .addField(
      `${client.config.prefix}help ${client.config.prefix}h ${client.config.prefix}info\n${client.config.prefix}invite ${client.config.prefix}vote`,
      `${supertag}`,
      true
    )
    .addField(
      `${client.config.prefix}eval\n${client.config.prefix}removed\nCode Optimization\nLogo`,
      `${indextag}`,
      true
    )
    .addField(
      `Raidmode\nGeneral Code Improvements\n${client.config.prefix}links\n${client.config.prefix}pinq`,
      `${senkotag}`,
      true
    )
    .addField(
      "Special Thanks",
      `${lunatag} for the G Detector idea\n${razieltag} & ${nyxtag} for creating G.A.S\n${hhhhhhtag} for helping us with ${client.config.prefix}removed`,
      false
    )
    .setTimestamp()
    .setFooter(`${message.author.tag}`, `${message.author.avatarURL({dynamic: true})}`);
  message.channel.send(creditsEmbed);
};
