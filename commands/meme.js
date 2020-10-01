exports.run = (client, message, args) => {
 if (args.join(" ")) return;
  message.channel.send("Oto twój mem.", {
    files: [
      {
        attachment:
          "https://api.xenith.pl/memapi",
        name: `GAS_Bot-Meme-${message.id}.png`
      }
    ]
  });
};
