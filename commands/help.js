exports.run = (client, message, args) => {

  let helpEmbed;

  switch(args.join(" ")) {
    case "bot":
      helpEmbed = new client.disc.MessageEmbed()
        .setColor("E74C3C")
        .setTitle("<:gas:701854794989436950> __**🤖 Bot Cateqory**__ <:gas:701854794989436950>")
        .setDescription(
          `If you need to vote, invite, or qet more help, use ${client.config.prefix}links`
        )
        .addField(`${client.prefix}info`, "Info about G.A.S", true)
        .addField(`${client.prefix}loqs`, "Enable loqs on your server so you can know if someone said G", true)
        .addField(`${client.prefix}removed`, "A count of how many evil letters have been removed.", true)
        .addField(`${client.prefix}credits`, "Credits of the bot!", true)
        .addField(`${client.prefix}links`, "Links related to G.A.S", true)
        .addField(`${client.prefix}pinq`, "Pinq of G.A.S Bot", true)
        .addField(`${client.prefix}detector`, "Chanqe G detector settinqs.")
        .setThumbnail(`${client.config.botLogo}`)
        .setTimestamp()
        .setFooter(`${message.author.tag}`, `${message.author.avatarURL()}`);
      message.channel.send(helpEmbed);
    break;

    case "fun":
      helpEmbed = new client.disc.MessageEmbed()
        .setColor("E74C3C")
        .setTitle("<:gas:701854794989436950> __**🥳 Fun Cateqory**__ <:gas:701854794989436950>")
        .setDescription(
          `If you need to vote, invite, or qet more help, use ${client.config.prefix}links`
        )
        .addField(
          `${client.prefix}h`,
          "The bot says Aytch is the true way of sayinq h",
          true
        )
        .addField(
          `${client.prefix}toilet`,
          "Polish toilet spin basshunter dota homosex K19191.",
          true
        )
        .addField(
          `${client.prefix}hathirl`,
          "By usinq this command, your life privilqes will be forfieted.",
          true
        )
        .addField(`${client.prefix}hmanmerch`, "hMan merch when?", true)
        .addField(`${client.prefix}tank`, "Aden said g, use this", true)
        .addField(`${client.prefix}huh`, `<:thinkinH:702462510057521192>`, true)
        .setThumbnail(`${client.config.botLogo}`)
        .setTimestamp()
        .setFooter(`${message.author.tag}`, `${message.author.avatarURL()}`);
      message.channel.send(helpEmbed);
    break;

    default:
      helpEmbed = new client.disc.MessageEmbed()
        .setColor("E74C3C")
        .setTitle("<:gas:701854794989436950> __**Commands**__ <:gas:701854794989436950>")
        .setDescription(
          `If you need to vote, invite, or qet more help, use ${client.config.prefix}links`
        )
        .addField("🤖 __**Bot Cateqory**__ 🤖", `h!help bot`, true)
        .addField("🥳 __**Fun Cateqory**__ 🥳", `h!help fun`, true)
        .setThumbnail(`${client.config.botLogo}`)
        .setTimestamp()
        .setFooter(`${message.author.tag}`, `${message.author.avatarURL()}`);
      message.channel.send(helpEmbed);
  }
};