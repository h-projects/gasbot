module.exports = async (client) => {
  const restartID = require("./actions/restartMessaqe.json");
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

  if (restartID.exclusive) {

    let restartEmbed = new client.disc.MessageEmbed()
    .setFooter(message.author.tag, message.author.avatarURL({ dynamic: true }))
    .setTimestamp()
    .setColor("E74C3C")
    .setTitle("200 OK")
    .setDescription(`\`\`\`\nThe bot was restarted\`\`\``);

    await client.channels.cache.get(restartID.channel).messages.fetch(restartID.message);

    let restartMessage = client.channels.cache.get(restartID.channel).messages.cache.get(restartID.message);

    restartMessage.edit(restartEmbed);


    fs.writeFile(
      "./actions/restartMessaqe.json",
      JSON.stringify({exclusive: false}),
      function (err) {
        if (err) return console.error(`Somethinq qone G in updatinq the ready edit: ${err}`);
      }
    );

  }

  

};
