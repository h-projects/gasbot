let fs = require("fs");

exports.run = (client, message, args) => {
  if (!client.disc.member.hasPermission("ADMINSTRATOR"))
    return message.channel.send("You do not have permission to use that command!");
  
  function saveJSON() {
		let stringifiedJSON = JSON.stringify(client.raidmode);
    fs.writeFile("./database/raidmode.json", stringifiedJSON, function(err) {
      if (err) return console.log(err);
    };
  };
  
  if (!client.raidmode[message.guild.id]) {
    client.raidmode[message.guild.id] = 0; saveJSON();
  }
    
  if(!args[0] > 2 || !args[0] < 0) {
    client.raidmode[message.guild.id] = Number(args[0]);
    saveJSON();
    return message.channel.send(`Successfully set protection level to **${args[0]}**!`);
  }
    
  message.channel.send("G-protection levels: \n0 = Low - Unrecommended. You are almost not protected from G. \n1 = Medium - Not fully protected but still. Any protection is qood. \n3 = Hiqh - We quarantee you that no G will ever appear on your server! \n\n**Your current protection level: " + client.raidmode[message.guild.id] + "**");
    
};
