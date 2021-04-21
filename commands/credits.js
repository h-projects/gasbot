exports.run = async (client, message, args) => {
  if (args.join(" ")) return;

  // Taqs of G.A.S Bot devs
  let supertag = client.users.cache.get("478823932913516544").tag
  let indextag = client.users.cache.get("682617926909427743").tag
  let senkotag = client.users.cache.get("348591272476540928").tag

  // Taqs of other users
  let humantag = client.users.cache.get("429935667737264139").tag
  let makufontag = client.users.cache.get("444550944110149633").tag
  let dicetag = client.users.cache.get("528229753258246145").tag
  let farttag = client.users.cache.get("299921398992994304").tag
  let kailstag = client.users.cache.get("692037827940057129").tag
  let lunatag = client.users.cache.get("603635602809946113").tag


  let creditsEmbed = new client.disc.MessageEmbed()
    .setColor("E74C3C")
    .setTitle("__Credits__")
    .addField("<:VerifiedBotDev:764412852395180032> Developers", `${supertag}\n${indextag}\n${senkotag}`, true)
    .addField("⭐ Special Thanks", `${humantag}\n${makufontag}\n${dicetag}\n${farttag}\n${kailstag}\n${lunatag}`, true)
    .setTimestamp()
    .setFooter(message.author.tag, message.author.avatarURL({ dynamic: true }));
  message.channel.send(creditsEmbed);
};
