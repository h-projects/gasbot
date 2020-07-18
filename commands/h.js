exports.run = (client, message, args) => {
  if (args.join(" ")) return;
  message.channel.send("h = H, #bothhmatter", {
    files: [
      {
        attachment:
          "https://cdn.glitch.com/c5ebb36a-c4ea-424f-a0e6-f74d97f03143%2F647484b2-833c-4a02-9ea4-764ab2d9e0db.image.png?v=1591903836599",
        name: `GAS_Bot-H-${message.id}.png`
      }
    ]
  });
};