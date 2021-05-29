exports.run = async (client, message, args) => {
  if (args.join(" ")) return;
  message.channel.send("h", {
    files: [
      {
        attachment:
          "https://cdn.discordapp.com/attachments/701593186598125611/831503732096499762/h1.gif",
        name: `GAS_Bot-H-${message.id}.gif`
      }
    ]
  });
}

