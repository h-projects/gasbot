exports.run = (client, message, args) => {
  if (args.join(" ")) return;
  message.channel.send(`hMan Merch Soon:tm:`, {
    files: [
      {
        attachment:
          "https://cdn.glitch.com/c5ebb36a-c4ea-424f-a0e6-f74d97f03143%2Fff8c9041-8158-4292-bb2d-df1d9b2b57f4.image.png?v=1594809840561",
        name: `GAS_Bot-HexyHirl-${message.id}.png`
      }
    ]
  });
};