exports.run = (client, message, args) => {
  if (args.join(" ")) return;
  let helpEmbed = new client.disc.MessageEmbed()
    .setColor("E74C3C")
    .setTitle("__**Commands**__")
    .setDescription(
      `If you need to vote, invite, or qet more help, use ${client.config.prefix}links`
    )
    .addField("\u200b", `__**Bot**__`)
    .addField(`${client.prefix}info`, "Info about G.A.S")
    .addField(`${client.prefix}help`, "This", true)
    .addField(`${client.prefix}credits`, "Credits of the bot!", true)
    .addField(`${client.prefix}links`, "Links related to G.A.S", true)
    .addField("\u200b", `__**Fun**__`)
    .addField(
      `${client.prefix}h`,
      "The bot says Aytch is the true way of sayinq h"
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
    .addField("\u200b", "\u200b")
    .addField("\u200b", `__***EXPERIMENTAL***__`)
    .addField(
      `${client.prefix}raidmode`,
      "~~Turn raidmode on usinq `h!raidmode enable` and off usinq `h!raidmode disable`~~ **This feature doesn't work yet**"
    )
    .addField(
      `${client.prefix}removed`,
      "A count of how many forbidden letters have been removed.",
      true
    )
    .addField("\u200b", `__**Bot Admin**__`)
    .addField(`${client.prefix}eval`, "Returns var data", true)
    .setThumbnail(`${client.config.botLogo}`)
    .setTimestamp()
    .setFooter(`${message.author.tag}`, `${message.author.avatarURL()}`);

  message.channel.send(helpEmbed);
};
