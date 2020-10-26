exports.run = (client, message, args) => {
  if (args.join(" ")) return;
  message.channel.send({
    embed: {
      color: 15158332,
      title: "__Links__",
      fields: [
        {
          name: "Want to remove <:NoSeventhLetter:721649657146769449> in your server?",
          value: `<:gas:734396942653718561> Invite the bot [here](${client.config.botInvite})`
        },
        {
          name: "Want to support G.A.S Bot?",
          value: `<:gas:734396942653718561> Upvote the bot [here](${client.config.botUpvote})`
        },
        {
          name: "Need Help?",
          value: `<:AytchSoftware:720949593696894996> Join the official Aytch Software Server [here](${client.config.serverInvite})`
        },
        {
          name: "Need help settinq up the bot?",
          value: `<:AytchSoftware:720949593696894996> Read the docs [here](${client.config.docs})`
        },
        {
          name: "Do You hate <:NoSeventhLetter:721649657146769449>?",
          value: `<:gas:734396942653718561> Join the official G.A.S Server [here](${client.config.gasServer})`
        }
      ],
      timestamp: new Date(),
      footer: {
        text: `${message.author.tag}`,
        icon_url: `${message.author.avatarURL({dynamic: true})}`
      }
    }
  });
};
