exports.run = (client, message, args) => {
 if (args.join(" ")) return;
  message.channel.send("Oto twój mem.", {
    files: [
      {
        attachment:
          "https://indexerrowaty.pl/nosacz",
        name: `GAS_Bot-Meme-${message.id}.png`
      }
    ]
  });
};