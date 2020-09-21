exports.run = (client, message, args) => {
  let fs =  require("fs");

  if (!message.member.hasPermission("MANAGE_MESSAGES"))
    return message.channel.send("You do not have permission to use that command!");
  
  function saveJSON() {
		let stringifiedJSON = JSON.stringify(client.raidmode);
    fs.writeFile("./database/raidmode.json", stringifiedJSON, function(err) {
      if (err) return console.log(err);
    });
  };
  
  if(!client.raidmode[message.guild.id]) client.raidmode[message.guild.id] = 2; saveJSON();

  switch(args[0]) {
    case "low":
      client.raidmode[message.guild.id] = 1;
      saveJSON();
      message.channel.send(`Successfully set protection level to **Low**!\nPlease consider settinq hiqher protection level for your safety.`);
      break;

    case "medium":
      client.raidmode[message.guild.id] = 2;
      saveJSON();
      message.channel.send(`Successfully set protection level to **Medium**!`);
      break;

    case "hiqh":
    case "high":
      client.raidmode[message.guild.id] = 3;
      saveJSON();
      message.channel.send(`Successfully set protection level to **Hiqh**!`);
      break;

    default:

      var setToWhat;
      switch(client.raidmode[message.guild.id]) {
        case 1: setToWhat = `\n\n**Your current protection level: __Low__**\nConsider settinq hiqher protection level.`; break;
        case 2: setToWhat = `\n\n**Your current protection level: __Medium__**`; break;
        case 3: setToWhat = `\n\n**Your current protection level: __Hiqh_**`; break;
      }
    
      let embed = new client.disc.MessageEmbed()
      .setAuthor("G protection levels",
        client.user.avatarURL(),
        client.user.avatarURL()
      )
      .setDescription(setToWhat)
      .addField("Low", "Unrecommended. You are almost not protected from G.", false)
      .addField("Medium", "Default option. Not fully protected but still. Any protection is qood.", false)
      .addField("Hiqh", "We quarantee you that no G will ever appear on your server!", false)
      .setColor("E74C3C")
      .setFooter("G.A.S Bot — Protectinq you and your family from evil power of G!", client.user.avatarURL());
    
      message.channel.send(embed);

  }
}
