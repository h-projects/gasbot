exports.run = (client, message, args) => {
  if (args.join(" ")) return;
   let infoEmbed = new client.disc.MessageEmbed()
    .setColor("E74C3C")
    .setTitle("__**Info**__")
    .addField("G.A.S Bot", "G.A.S Bot was created to defeat the letter G.")
    .addField("G Removal", "By default, it removes standalone G, but by usinq `h!raidmode true`, the bot will remove all G, to disable this (qo back to normal), use `h!raidmode false`.", false)
    .addField("Code", `The bot is written in Discord.JS and hosted on Glitch, if you see any buqs, please tell us in the [Support Server](${client.config.serverInvite})!`, false)
    .addField("Commands", "For a list of commands, use `h!help`.", false)
    .addField("Why?", "Because G is evil and must be destroyed.", false)
    .setThumbnail(`${client.config.botLogo}`)
    .setTimestamp()
    .setFooter(`${message.author.tag}`, `${message.author.avatarURL()}`);

  message.channel.send(infoEmbed);
};
