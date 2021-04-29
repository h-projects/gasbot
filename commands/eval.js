exports.run = async (client, message, args) => {
  let ids = ["478823932913516544", "682617926909427743", "348591272476540928"];

  if (message.guild.id === "720009823458033705" &&
    !args.join(" ").includes("disableMentions") &&
    !args.join(" ").includes("allowedMentions") &&
    !args.join(" ").includes("eval") &&
    !args.join(" ").includes("ban") &&
    !args.join(" ").includes("kick") &&
    !args.join(" ").includes("prune") &&
    !args.join(" ").includes("leave") &&
    !args.join(" ").includes("token") &&
    !args.join(" ").includes("TOKEN") &&
    !args.join(" ").includes("TOPGGTOKEN") &&
    !args.join(" ").includes("config.json") &&
    !args.join(" ").includes("require") &&
    !args.join(" ").includes("shell") &&
    ids.includes(message.author.id)) {
    try {

      let evaled = eval(args.join(" "));
      let evalEmbed = new client.disc.MessageEmbed()
        .setFooter(message.author.tag, message.author.avatarURL({ dynamic: true }))
        .setTimestamp()
        .setColor("E74C3C")
        .setTitle("200 OK")
        .setDescription(`\`\`\`js\n${evaled}\n\`\`\``);

      message.channel.send(evalEmbed);

    } catch (e) {

      let evalEmbed = new client.disc.MessageEmbed()
        .setFooter(message.author.tag, message.author.avatarURL({ dynamic: true }))
        .setTimestamp()
        .setColor("E74C3C")
        .setTitle("503 Internal Execution Error")
        .setDescription(`There was an error executinq the requested evaluation.\n\`\`\`js\n${e}\n\`\`\``);

      message.channel.send(evalEmbed);

    }
  } else {

    let evalEmbed = new client.disc.MessageEmbed()
      .setFooter(message.author.tag, message.author.avatarURL({ dynamic: true }))
      .setTimestamp()
      .setColor("E74C3C")
      .setTitle("403 Forbidden")
      .setDescription("You don't have permission to use that command!");

    return message.channel.send(evalEmbed);
  };
  return;
};
