exports.run = async (client, message, args) => {
  if (args.join(" ")) return;
  let infoEmbed = new client.disc.MessageEmbed()
    .setColor("E74C3C")
    .setTitle("Info")
    .addField("G.A.S Bot", "G.A.S Bot was created to defeat the letter G.")
    .addField("G Removal", "By default, it removes standalone G, but by usinq `h!detector` this can be chanqed to one of these options:", false)
    .addField("Low", "Lowest option, deletes a messaqe if it only consists of G. Detects `g` but not `test g test`", false)
    .addField("Medium", "Default option, only detects G if it's outside words. Detects `test g test` but not `germany`. Recommended option", false)
    .addField("Hiqh", "Hiqhest option, detects G even inside words. Detects `germany` and `message`. Useful if your server is beinq raided by g-spies", false)
    .addField("Code", `The bot is written in Discord.JS and hosted on [GalaxyGate](https://www.galaxygate.net/), if you see any buqs, please tell us in the [Support Server](${client.config.serverInvite})!`, false)
    .addField("Commands", `For a list of commands, use \`${client.prefix[message.guild.id]}\`.`, false)
    .addField("Why?", "Because G is evil and must be destroyed.", false)
    .setThumbnail(`${client.config.botLogo}`)
    .setTimestamp()
    .setFooter(message.author.tag, message.author.avatarURL({ dynamic: true }));

  message.channel.send(infoEmbed);
}
