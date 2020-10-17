exports.run = (client, message, args) => {
  
 let removedEmbed = new client.disc.MessageEmbed()
  .setColor("E74C3C")
  .setTitle("__Bad Letters Removed__")
  .setDescription(`Removed ${client.badLetterCount.badLetterCount} bad letters protectinq people from possible death!`)
  .setTimestamp()
  .setFooter(`${message.author.tag}`, `${message.author.avatarURL()}`);
  
 message.channel.send(removedEmbed);
  
};
