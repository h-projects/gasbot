exports.run = (client, message, args) => {
  if (args.join(" ")) return;
  message.channel.send(
    "**Juan**",
    {
      files: [
        {
          attachment:
            "https://cdn.discordapp.com/attachments/729730142125031505/768799803009269771/hYrZ6QK.png",
          name: `GAS_Bot-Juan-${message.id}.png`
        }
      ]
    }
  );
};
