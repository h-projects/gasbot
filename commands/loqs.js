exports.run = (client, message, args) => {
  if (args.join(" ")) return;
   let infoEmbed = new client.disc.MessageEmbed()
    .setColor("E74C3C")
    .setTitle("__**Loqs**__")
    .addField('To enable loqs on your server, just create a channel called "loqs"!', "\u200b")
    .setTimestamp()
    .setFooter(`${message.author.tag}`, `${message.author.avatarURL()}`);

  message.channel.send(infoEmbed);
};
