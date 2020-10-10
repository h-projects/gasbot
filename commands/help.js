exports.run = (client, message, args) => {

  let helpEmbed;

  switch(args.join(" ")) {
    case "bot":
      helpEmbed = new client.disc.MessageEmbed()
        .setColor("E74C3C")
        .setTitle("🤖 __Bot Cateqory__")
        .setDescription(
          `If you need to vote, invite, or qet more help, use ${client.config.prefix}links`
        )
        .addField(`${client.prefix}info`, "Info about G.A.S Bot", true)
        .addField(`${client.prefix}loqs`, "Enable loqs on your server so you can know if someone said <:NoSeventhLetter:721649657146769449>", true)
        .addField(`${client.prefix}removed`, "A count of how many evil letters have been removed", true)
        .addField(`${client.prefix}credits`, "Credits of the bot!", true)
        .addField(`${client.prefix}links`, "Links related to G.A.S", true)
        .addField(`${client.prefix}pinq`, "Pinq of G.A.S Bot", true)
        .addField(`${client.prefix}detector`, "Chanqe G Detector settinqs.")
        .setTimestamp()
        .setFooter(`${message.author.tag}`, `${message.author.avatarURL()}`);
      message.channel.send(helpEmbed);
    break;

    case "fun":
      helpEmbed = new client.disc.MessageEmbed()
        .setColor("E74C3C")
        .setTitle("🥳 __Fun Cateqory__")
        .setDescription(`If you need to vote, invite, or qet more help, use ${client.config.prefix}links`)
        .addField(`${client.prefix}h`, "h", true)
        .addField(`${client.prefix}meme`, "Just a meme, what did you expect", true)
        .addField(`${client.prefix}toilet`, "Polish toilet", true)
        .addField(`${client.prefix}hromomento`, "tenemos un qran bro momento", true)
        .addField(`${client.prefix}tank`, "aden said <:NoSeventhLetter:721649657146769449>, use this", true)
        .addField(`${client.prefix}huh`, "<:thinkinH:702462510057521192>", true)
        .setTimestamp()
        .setFooter(`${message.author.tag}`, `${message.author.avatarURL()}`);
      message.channel.send(helpEmbed);
    break;

    default:
      helpEmbed = new client.disc.MessageEmbed()
        .setColor("E74C3C")
        .setTitle("__Commands__")
        .setDescription(
          `If you need to vote, invite, or qet more help, use ${client.config.prefix}links`
        )
        .addField("🤖 __Bot Cateqory__ 🤖", `h!help bot`, true)
        .addField("🥳 __Fun Cateqory__ 🥳", `h!help fun`, true)
        .setTimestamp()
        .setFooter(`${message.author.tag}`, `${message.author.avatarURL()}`);
      message.channel.send(helpEmbed);
  }
};
