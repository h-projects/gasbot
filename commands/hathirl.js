exports.run = (client, message, args) => {
  if (args.join(" ")) return;
  let hathirls = [
    "https://cdn.glitch.com/c5ebb36a-c4ea-424f-a0e6-f74d97f03143%2Fa7bdb706-8690-48ec-81dd-0bd0442902a3.image.png?v=1591901873568",
    "https://cdn.glitch.com/c5ebb36a-c4ea-424f-a0e6-f74d97f03143%2F6d14a9e4-7ff4-4a16-b5df-b70be0b63cb4.image.png?v=1594809971874"
  ];
  message.channel.send(`You fuckinq weeb, you used me for this? That's it, I am forfietinq your life privilqe.  `, {
    files: [
      {
        attachment: hathirls[Math.floor(Math.random() * hathirls.length)],
        name: `GAS_Bot-Hathirl-${message.id}.png`
      }
    ]
  });
};
