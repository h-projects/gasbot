exports.run = (client, message, args) => {
  if (args.join(" ")) return;
  message.channel.send(
    `**hro momento**`,
    {
      files: [
        {
          attachment:
            "https://media.tenor.com/images/b5c0e0aeae6442742b71ca0017fc686a/tenor.gif",
          name: `GAS_Bot-HBroMomento-${message.id}.gif`
        }
      ]
    }
  );
};