exports.run = async (client, message, args) => {
  if (args.join(" ")) return;
  message.channel.send("huh", {
    files: [
      {
        attachment:
          "https://cdn.glitch.com/c5ebb36a-c4ea-424f-a0e6-f74d97f03143%2Fda1f22c4-aa0c-40ec-afae-e7dbd0bcf1a7.image.png?v=1591903688458",
        name: `GAS_Bot-Huh-${message.id}.png`
      }
    ]
  });
}
