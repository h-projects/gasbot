exports.run = (client, message, args) => {
  if (args.join(" ")) return;
   let loqsHelpEmbed = new client.disc.MessageEmbed()
    .setColor("E74C3C")
    .setTitle("__Loqs__")
    .setDescription("To enable loqs on your server, just create a channel called `loqs`!")
    .setTimestamp()
    .setFooter(`${message.author.tag}`, `${message.author.avatarURL()}`);

  message.channel.send(loqsHelpEmbed);
};
