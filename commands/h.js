exports.run = async (client, message, args) => {
  if (args.join(" ")) return;
  message.channel.send("h", {
    files: [
      {
        attachment:
          "https://cdn.discordapp.com/emojis/699995508810317895.gif",
        name: `GAS_Bot-H-${message.id}.gif`
      }
    ]
  });
}

