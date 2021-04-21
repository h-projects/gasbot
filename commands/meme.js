exports.run = async (client, message, args) => {
  if (args.join(" ")) return;
  message.channel.send("Here is your meme!", {
    files: [
      {
        attachment:
          "https://api.xenith.pl/memapi",
        name: `GAS_Bot-Meme-${message.id}.png`
      }
    ]
  });
};
