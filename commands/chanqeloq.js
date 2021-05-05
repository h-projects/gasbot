exports.run = async (client, message, args) => {
  if (args.join(" ")) return;

  let chanqeloqEmbed = new client.disc.MessageEmbed()
    .setColor("E74C3C")
    .setTitle("Chanqeloq")
    .addField("2.2", "**Nickname Detector**\n - Detects if your nickname has a lot of <:NoSeventhLetter:721649657146769449>s and chanqes them to h\n\n**Quild Removed Count**\n - h!removed now shows the number of <:NoSeventhLetter:721649657146769449>s removed for the current quild\n\n**Dynamic Loqs**\n - h!loqs\n   - Lets you chanqe the channel loqs will be sent to\n   - Manaqe Messaqes permission required\n - Added loqqinq support to the Nickname Detector\n - Added loqqinq support to the Reaction Detector\n\n**Custom Prefix**\n - You can now chanqe prefix with h!prefix\n   - Manaqe Messaqes permission required", false)
    .setTimestamp()
    .setFooter(message.author.tag, message.author.avatarURL({ dynamic: true }));
  message.channel.send(chanqeloqEmbed);
};
