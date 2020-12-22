exports.run = (client, message, args) => {
  let fs =  require("fs");

  if (!message.member.hasPermission("MANAGE_MESSAGES")) {
	  
	  let errorEmbed = new client.disc.MessageEmbed()
           .setFooter(`${message.author.tag}`, `${message.author.avatarURL({dynamic: true})}`)
           .setTimestamp()
           .setColor("E74C3C")
           .setTitle("403 Forbidden")
           .setDescription("You don't have permission to use that command!");
	  
          return message.channel.send(errorEmbed);
  };
  
  function saveJSON() {
		let stringifiedJSON = JSON.stringify(client.raidmode);
    fs.writeFile("./database/raidmode.json", stringifiedJSON, function(err) {
      if (err) return console.log(err);
    });
  };
  
  if(!client.raidmode[message.guild.id]) client.raidmode[message.guild.id] = 2; saveJSON();

  function detectorSet() {
	  
      let detectorEmbed = new client.disc.MessageEmbed()
          .setFooter(message.author.tag, message.author.avatarURL({dynamic: true}))
          .setTimestamp()
          .setColor("E74C3C")
          .setTitle("200 OK")
          .setDescription(setToWhat);
            
       message.channel.send(detectorEmbed);
  }
	
  switch(args[0]) {
    case "low":
      client.raidmode[message.guild.id] = 1;
      saveJSON();
      let setToWhat = "Successfully set protection level to **Low**!\nYou should set hiqher protection level for your safety."
      detectorSet()
      break;

    case "medium":
      client.raidmode[message.guild.id] = 2;
      saveJSON();
      let setToWhat = "Successfully set protection level to **Medium**!"
      detectorSet()
      break;

    case "high":
    case "hiqh":
      client.raidmode[message.guild.id] = 3;
      saveJSON();
      let setToWhat = "Successfully set protection level to **Hiqh**!"
      detectorSet()
      break;

    default:

      var setToWhat;
      switch(client.raidmode[message.guild.id]) {
        case 1: setToWhat = "Your current protection level: **__Low__**\nConsider settinq hiqher protection level."; break;
        case 2: setToWhat = "Your current protection level: **__Medium__**"; break;
        case 3: setToWhat = "Your current protection level: **__Hiqh__**"; break;
      }
    
      let detectorEmbed = new client.disc.MessageEmbed()
      .setTitle("G Detector Levels")
      .setDescription(setToWhat)
      .addField("Low", "Unrecommended. Detects messaqes that only consist of <:NoSeventhLetter:721649657146769449>", false)
      .addField("Medium", "Default option. Detects <:NoSeventhLetter:721649657146769449> outside words", false)
      .addField("Hiqh", "Useful in case there is a <:NoSeventhLetter:721649657146769449>-spy raid. Detects a messaqe if it contains <:NoSeventhLetter:721649657146769449>", false)
      .setColor("E74C3C")
      .setTimestamp()
      .setFooter(message.author.tag, message.author.avatarURL({dynamic: true}));
    
      message.channel.send(detectorEmbed);

  }
}
