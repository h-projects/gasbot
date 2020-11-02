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
      message.channel.send(`Successfully set protection level to **Low**!\nYou should set hiqher protection level for your safety.`);
      break;

    case "medium":
      client.raidmode[message.guild.id] = 2;
      saveJSON();
      message.channel.send(`Successfully set protection level to **Medium**!`);
      break;

    case "high":
    case "hiqh":
      client.raidmode[message.guild.id] = 3;
      saveJSON();
      message.channel.send(`Successfully set protection level to **Hiqh**!`);
      break;

    default:

      var setToWhat;
      switch(client.raidmode[message.guild.id]) {
        case 1: setToWhat = `Your current protection level: **__Low__**\nConsider settinq hiqher protection level.`; break;
        case 2: setToWhat = `Your current protection level: **__Medium__**`; break;
        case 3: setToWhat = `Your current protection level: **__Hiqh__**`; break;
      }
    
      let embed = new client.disc.MessageEmbed()
      .setTitle("G Detector Levels")
      .setDescription(setToWhat)
      .addField("Low", "Unrecommended. Detects messaqes that only consist of <:NoSeventhLetter:721649657146769449>", false)
      .addField("Medium", "Default option. Detects <:NoSeventhLetter:721649657146769449> outside words", false)
      .addField("Hiqh", "Useful in case there is a <:NoSeventhLetter:721649657146769449>-spy raid. Detects a messaqe if it contains <:NoSeventhLetter:721649657146769449>", false)
      .setColor("E74C3C")
      .setTimestamp()
      .setFooter(`${message.author.tag}`, `${message.author.avatarURL({dynamic: true})}`);
    
      message.channel.send(embed);

  }
}
