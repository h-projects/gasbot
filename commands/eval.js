exports.run = (client, message, args) => {
  let ids = ["478823932913516544", "651511209585147904", "348591272476540928"];
  if (ids.includes(message.author.id)) {
    try {
      let evaled = eval(args.join(" "));
      message.channel.send(`\`\`\`js\n${evaled}\n\`\`\``);
    } catch (e) {
      message.channel.send(
        `**503 Internal Execution Error**\nThere was an erorr executinq the requested evaluation.\n\`\`\`js\n${e}\n\`\`\``
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
};
  