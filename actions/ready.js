module.exports = async (client) => {
  const fs = require("fs-extra");

  client.users.fetch("478823932913516544");
  client.users.fetch("682617926909427743");
  client.users.fetch("348591272476540928");
  client.users.fetch("429935667737264139");
  client.users.fetch("444550944110149633");
  client.users.fetch("528229753258246145");
  client.users.fetch("299921398992994304");
  client.users.fetch("692037827940057129");
  client.users.fetch("603635602809946113");
  console.log("Bot is now H");

  if (client.restartID.exclusive) {

    let restartEmbed = new client.disc.MessageEmbed()
    .setFooter(client.restartID.tag, client.restartID.icon)
    .setTimestamp()
    .setColor("E74C3C")
    .setTitle("200 OK")
    .setDescription(`\`\`\`\nThe bot was restarted\`\`\``);

    await client.channels.cache.get(client.restartID.channel).messages.fetch(client.restartID.message);

    let restartMessage = client.channels.cache.get(client.restartID.channel).messages.cache.get(client.restartID.message);

    restartMessage.edit(restartEmbed);

    client.restartID.exclusive = false;

    await fs.writeFileSync("./database/restart.json", JSON.stringify(client.restartID));

  };

  

};
