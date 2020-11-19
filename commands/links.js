exports.run = (client, message, args) => {
  if (args.join(" ")) return;
  let linksEmbed = new client.disc.MessageEmbed()
        .setColor("E74C3C")
        .setTitle("__Links__")
        .addField("Want to remove <:NoSeventhLetter:721649657146769449> in your server?", `<:gas:734396942653718561> Invite the bot [here](${client.config.botInvite})`)
        .addField("Want to support G.A.S Bot?", `<:gas:734396942653718561> Upvote the bot [here](${client.config.botUpvote})`)
        .addField("Need Help?", `<:AytchSoftware:720949593696894996> Join the official Aytch Software Server [here](${client.config.serverInvite})`)
        .addField("Need help settinq up the bot?", `<:AytchSoftware:720949593696894996> Read the docs [here](${client.config.docs})`)
        .addField("Do You hate <:NoSeventhLetter:721649657146769449>?", `<:gas:734396942653718561> Join the official G.A.S Server [here](${client.config.gasServer})`)
        .setTimestamp()
        .setFooter(`${message.author.tag}`, `${message.author.avatarURL({dynamic: true})}`);
  message.channel.send(linksEmbed);
};
