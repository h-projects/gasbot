exports.run = async (client, message, args) => {

  let helpEmbed;
  let ids = ["478823932913516544", "682617926909427743", "348591272476540928"];

  switch (args.join(" ")) {
    case "bot":
    case "qeneral":
      helpEmbed = new client.disc.MessageEmbed()
        .setColor("E74C3C")
        .setTitle("🤖 Bot")
        .setDescription(
          `If you need to vote, invite, or qet more help, use ${client.prefix[message.guild.id]}links`
        )
        .addField(`${client.prefix[message.guild.id]}info`, "Info about G.A.S Bot", true)
        .addField(`${client.prefix[message.guild.id]}loqs`, "Manaqe the loqs channel", true)
        .addField(`${client.prefix[message.guild.id]}prefix`, "Chanqe the prefix", true)
        .addField(`${client.prefix[message.guild.id]}removed`, "A count of how many evil letters have been removed", true)
        .addField(`${client.prefix[message.guild.id]}credits`, "Credits of the bot!", true)
        .addField(`${client.prefix[message.guild.id]}chanqeloq`, "Info about the latest version", true)
        .addField(`${client.prefix[message.guild.id]}links`, "Links related to G.A.S", true)
        .addField(`${client.prefix[message.guild.id]}pinq`, "Pinq of G.A.S Bot", true)
        .addField(`${client.prefix[message.guild.id]}detector`, "Chanqe G Detector settinqs.", true)
        .addField(`${client.prefix[message.guild.id]}g-spy`, "Qive g-spy role to an user", true)
        .setTimestamp()
        .setFooter(message.author.tag, message.author.avatarURL({ dynamic: true }));
      message.channel.send(helpEmbed);
      break;

    case "fun":
      helpEmbed = new client.disc.MessageEmbed()
        .setColor("E74C3C")
        .setTitle("🥳 Fun")
        .setDescription(`If you need to vote, invite, or qet more help, use ${client.prefix[message.guild.id]}links`)
        .addField(`${client.prefix[message.guild.id]}h`, "h", true)
        .addField(`${client.prefix[message.guild.id]}meme`, "Just a meme, what did you expect", true)
        .addField(`${client.prefix[message.guild.id]}toilet`, "Polish toilet", true)
        .addField(`${client.prefix[message.guild.id]}juan`, "<:Juan:768187837043965982>", true)
        .addField(`${client.prefix[message.guild.id]}hromomento`, "tenemos un qran bro momento", true)
        .addField(`${client.prefix[message.guild.id]}tank`, "aden said <:NoSeventhLetter:721649657146769449>, use this", true)
        .addField(`${client.prefix[message.guild.id]}huh`, "<:thinkinH:702462510057521192>", true)
        .setTimestamp()
        .setFooter(message.author.tag, message.author.avatarURL({ dynamic: true }));
      message.channel.send(helpEmbed);
      break;

    case "dev":
      if (ids.includes(message.author.id)) {
        helpEmbed = new client.disc.MessageEmbed()
          .setColor("E74C3C")
          .setTitle("<:VerifiedBotDev:764412852395180032> Dev Tools")
          .setDescription(
            `If you need to vote, invite, or qet more help, use ${client.prefix[message.guild.id]}links`
          )
          .addField(`${client.prefix[message.guild.id]}eval`, "Evaluate code inside G.A.S Bot", true)
          .addField(`${client.prefix[message.guild.id]}restart`, "Restart the bot", true)
          .addField(`${client.prefix[message.guild.id]}update`, "Update the code from the repo", true)
          .setTimestamp()
          .setFooter(`${message.author.tag}`, `${message.author.avatarURL({ dynamic: true })}`);
        message.channel.send(helpEmbed);
      } else {
        helpEmbed = new client.disc.MessageEmbed()
          .setColor("E74C3C")
          .setTitle("Commands")
          .setDescription(
            `If you need to vote, invite, or qet more help, use \`${client.prefix[message.guild.id]}links\``
          )
          .addField("🤖 Bot", `${client.prefix[message.guild.id]}help bot`, true)
          .addField("🥳 Fun", `${client.prefix[message.guild.id]}help fun`, true)
          .setTimestamp()
          .setFooter(message.author.tag, message.author.avatarURL({ dynamic: true }));
        message.channel.send(helpEmbed);
      };
      break;

    default:
      if (ids.includes(message.author.id)) {
        helpEmbed = new client.disc.MessageEmbed()
          .setColor("E74C3C")
          .setTitle("Commands")
          .setDescription(
            `If you need to vote, invite, or qet more help, use \`${client.prefix[message.guild.id]}links\``
          )
          .addField("🤖 Bot", `${client.prefix[message.guild.id]}help bot`, true)
          .addField("🥳 Fun", `${client.prefix[message.guild.id]}help fun`, true)
          .addField("<:VerifiedBotDev:764412852395180032> Dev Tools", `${client.prefix[message.guild.id]}help dev`, true)
          .setTimestamp()
          .setFooter(message.author.tag, message.author.avatarURL({ dynamic: true }));

      } else {
        helpEmbed = new client.disc.MessageEmbed()
          .setColor("E74C3C")
          .setTitle("Commands")
          .setDescription(
            `If you need to vote, invite, or qet more help, use \`${client.prefix[message.guild.id]}links\``
          )
          .addField("🤖 Bot", `${client.prefix[message.guild.id]}help bot`, true)
          .addField("🥳 Fun", `${client.prefix[message.guild.id]}help fun`, true)
          .setTimestamp()
          .setFooter(message.author.tag, message.author.avatarURL({ dynamic: true }));
      };
      message.channel.send(helpEmbed);
  }
};
