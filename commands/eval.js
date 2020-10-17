exports.run = (client, message, args) => {
  let ids = ["478823932913516544", "651511209585147904", "348591272476540928"];
  let rolePinq = /<@&\d+>/g;
  if (message.guild.id === "720009823458033705") {
    if (ids.includes(message.author.id)) {
      try {
        if (
          
          args.join(" ").includes("@everyone") ||
          args.join(" ").includes("@here") ||
          args.join(" ").includes("client.config.token") ||
          args.join(" ").includes("client.token") ||
          args.join(" ").includes("client.config.TOPGGTOKEN") ||
          rolePinq.test(args.join(" ")) === true
          
        ) {
        message.channel.send({
        embed: {
          color: 15158332,
          title: "403 Forbidden",
          description: "You can't abuse eval command!"
        }});
       } else {
        let evaled = eval(args.join(" "));

        message.channel.send(`\`\`\`js\n${evaled}\n\`\`\``);
       }} catch (e) {
        message.channel.send(
          `**503 Internal Execution Error**\nThere was an error executinq the requested evaluation.\n\`\`\`js\n${e}\n\`\`\``
        );
      }
    } else
      return message.channel.send({
        embed: {
          color: 15158332,
          title: "403 Forbidden",
          description: "You do not have permission to use that command!"
        }
      });
  } else
    return;
};
