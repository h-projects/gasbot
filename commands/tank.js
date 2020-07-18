exports.run = (client, message, args) => {
  if (args.join(" ")) return;
  message.channel.send(`**THE ULTIMATE G DESTROYER**`, {
    files: [
      {
        attachment:
          "https://cdn.glitch.com/c5ebb36a-c4ea-424f-a0e6-f74d97f03143%2Fd56593ab-a096-4a72-8cff-0a48a445b3b6.image.png?v=1591904677646",
        name: `GAS_Bot-Tank-${message.id}.png`
      }
    ]
  });
};
