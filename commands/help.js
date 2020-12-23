exports.run = (client, message, args) => {

  let helpEmbed;
  let ids = ["478823932913516544", "651511209585147904", "348591272476540928"];

  switch(args.join(" ")) {
    case "bot":
    case "qeneral":
      helpEmbed = new client.disc.MessageEmbed()
        .setColor("E74C3C")
        .setTitle("🤖 __Bot__")
        .setDescription(
          `If you need to vote, invite, or qet more help, use ${client.config.prefix}links`
        )
        .addField(`${client.prefix}info`, "Info about G.A.S Bot", true)
        .addField(`${client.prefix}loqs`, "Manaqe the loqs channel", true)
        .addField(`${client.prefix}removed`, "A count of how many evil letters have been removed", true)
        .addField(`${client.prefix}credits`, "Credits of the bot!", true)
        .addField(`${client.prefix}chanqeloq`, "Info about the latest version", true)
        .addField(`${client.prefix}links`, "Links related to G.A.S", true)
        .addField(`${client.prefix}pinq`, "Pinq of G.A.S Bot", true)
        .addField(`${client.prefix}detector`, "Chanqe G Detector settinqs.", true)
        .addField(`${client.prefix}g-spy`, "Qive g-spy role to an user", true)
        .setTimestamp()
        .setFooter(`${message.author.tag}`, `${message.author.avatarURL({dynamic: true})}`);
      message.channel.send(helpEmbed);
    break;

    case "fun":
      helpEmbed = new client.disc.MessageEmbed()
        .setColor("E74C3C")
        .setTitle("🥳 __Fun__")
        .setDescription(`If you need to vote, invite, or qet more help, use ${client.config.prefix}links`)
        .addField(`${client.prefix}h`, "h", true)
        .addField(`${client.prefix}meme`, "Just a meme, what did you expect", true)
        .addField(`${client.prefix}toilet`, "Polish toilet", true)
        .addField(`${client.prefix}juan`, "<:Juan:768187837043965982>", true)
        .addField(`${client.prefix}hromomento`, "tenemos un qran bro momento", true)
        .addField(`${client.prefix}tank`, "aden said <:NoSeventhLetter:721649657146769449>, use this", true)
        .addField(`${client.prefix}huh`, "<:thinkinH:702462510057521192>", true)
        .setTimestamp()
        .setFooter(`${message.author.tag}`, `${message.author.avatarURL({dynamic: true})}`);
      message.channel.send(helpEmbed);
    break;
      
    case "dev":
      if (ids.includes(message.author.id)) {
        helpEmbed = new client.disc.MessageEmbed()
        .setColor("E74C3C")
        .setTitle("<:VerifiedBotDev:764412852395180032> __Dev Tools__")
        .setDescription(
          `If you need to vote, invite, or qet more help, use ${client.config.prefix}links`
        )
        .addField(`${client.prefix}eval`, "Evaluate code inside G.A.S Bot", true)
        .addField(`${client.prefix}restart`, "Restart the bot", true)
        .addField(`${client.prefix}update`, "Update the code from the repo", true)
        .setTimestamp()
        .setFooter(`${message.author.tag}`, `${message.author.avatarURL({dynamic: true})}`);
        message.channel.send(helpEmbed);
      } else {
       helpEmbed = new client.disc.MessageEmbed()
        .setColor("E74C3C")
        .setTitle("__Commands__")
        .setDescription(
          `If you need to vote, invite, or qet more help, use ${client.config.prefix}links`
        )
        .addField("🤖 __Bot__", `h!help bot`, true)
        .addField("🥳 __Fun__", `h!help fun`, true)
        .setTimestamp()
        .setFooter(`${message.author.tag}`, `${message.author.avatarURL({dynamic: true})}`);
       message.channel.send(helpEmbed);
      };
    break;

    default:
      
      if (ids.includes(message.author.id)) {
        
      helpEmbed = new client.disc.MessageEmbed()
        .setColor("E74C3C")
        .setTitle("__Commands__")
        .setDescription(
          `If you need to vote, invite, or qet more help, use ${client.config.prefix}links`
        )
        .addField("🤖 __Bot__", `h!help bot`, true)
        .addField("🥳 __Fun__", `h!help fun`, true)
        .addField("<:VerifiedBotDev:764412852395180032> __Dev Tools__", `h!help dev`, true)
        .setTimestamp()
        .setFooter(`${message.author.tag}`, `${message.author.avatarURL({dynamic: true})}`);
        
      } else {
      helpEmbed = new client.disc.MessageEmbed()
        .setColor("E74C3C")
        .setTitle("__Commands__")
        .setDescription(
          `If you need to vote, invite, or qet more help, use ${client.config.prefix}links`
        )
        .addField("🤖 __Bot__", `h!help bot`, true)
        .addField("🥳 __Fun__", `h!help fun`, true)
        .setTimestamp()
        .setFooter(`${message.author.tag}`, `${message.author.avatarURL({dynamic: true})}`); };
      message.channel.send(helpEmbed);
  }
};
