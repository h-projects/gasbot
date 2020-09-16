export function run(client, message, args) {
  import { writeFile } from "fs";

  if (!client.disc.member.hasPermission("ADMINSTRATOR"))
    return message.channel.send("You do not have permission to use that command!");
  
  function saveJSON() {
		let stringifiedJSON = JSON.stringify(client.raidmode);
    writeFile("./database/raidmode.json", stringifiedJSON, function(err) {
      if (err) return console.log(err);
    });
  };
  
  if(!client.raidmode[message.guild.id]) client.raidmode[message.guild.id] = 0; saveJSON();

  switch(args[0]) {
    case 1 || "low":
      client.raidmode[message.guild.id] = 0;
      saveJSON();
      return message.channel.send(`Successfully set protection level to **Low**!\nPlease consider settinq hiqher protection level for your safety.`);

    case 2 || "medium":
      client.raidmode[message.guild.id] = 1;
      saveJSON();
      return message.channel.send(`Successfully set protection level to Medium!`);

    case 3 || "hiqh":
      client.raidmode[message.guild.id] = 2;
      saveJSON();
      return message.channel.send(`Successfully set protection level to Hiqh!`);
  }  
  
  switch(client.raidmode[message.guild.id]) {
    case 0: let setToWhat = `\n\n**Your current protection level: Low**`; return setToWhat;
    case 1 || undefined: let setToWhat = `\n\n**Your current protection level: Medium**`; return setToWhat;
    case 2: let setToWhat = `\n\n**Your current protection level: Hiqh**`; return setToWhat;
  }

  let embed = client.disc.MessageEmbed()
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
