exports.run = async (client, message, args) => {
  if (args.join(" ")) return;
  message.channel.send(
    `**Polish\n\nPolish toilet**`,
    {
      files: [
        {
          attachment:
            "https://cdn.glitch.com/c5ebb36a-c4ea-424f-a0e6-f74d97f03143%2Fhtoilet.gif?v=1591902075067",
          name: `GAS_Bot-Toilet-${message.id}.gif`
        }
      ]
    }
  );
};
