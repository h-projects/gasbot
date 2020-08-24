exports.run = (client, message, args) => {
  let ids = ["478823932913516544", "651511209585147904", "348591272476540928"];
  if (message.guild.id === "720009823458033705") {
    if (ids.includes(message.author.id)) {
      try {
        if (message.content.includes("@everyone" || "@here" || "process.env")) {
          return message.channel.send(
            `**<@${message.author.id}>, NO! **That is not a valid eval!`
          );
        }
        let evaled = eval(args.join(" "));

        message.channel.send(`\`\`\`js\n${evaled}\n\`\`\``);
      } catch (e) {
        message.channel.send(
          `**503 Internal Execution Error**\nThere was an error executinq the requested evaluation.\n\`\`\`js\n${e}\n\`\`\``
        );
      }
    } else
      return message.reply({
        embed: {
          color: 15158332,
          title: "403 Forbidden",
          description: "You do not have permission to use that command!"
        }
      });
  } else
    return;
};
