exports.run = async (client, message, args) => {
  if (args.join(" ")) return;

  const meme = new client.disc.MessageAttachment("https://api.xenith.pl/memapi").setName(`GAS_Bot-Meme-${message.id}.png`)
  let embed = new client.disc.MessageEmbed();

  embed.setTitle('Here is your meme')
  embed.setDescription('Provided by the Xenith MemeAPI.')

  embed.attachFiles([meme])
  embed.setImage(`attachment://GAS_Bot-Meme-${message.id}.png`)

  embed.setColor("E74C3C")
  embed.setTimestamp()
  embed.setFooter(message.author.tag, message.author.avatarURL({ dynamic: true }))

  message.channel.send(embed);
}
