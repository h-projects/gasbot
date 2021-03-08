exports.run = (client, message, args) => {
  const fs = require("fs-extra");
  let ids = ["478823932913516544", "682617926909427743", "348591272476540928"];

  if (ids.includes(message.author.id)) {
    try {

      let restartEmbed = new client.disc.MessageEmbed()
        .setFooter(message.author.tag, message.author.avatarURL({ dynamic: true }))
        .setTimestamp()
        .setColor("E74C3C")
        .setTitle("Restart")
        .setDescription("Restartinq...");
      message.channel.send(restartEmbed).then( async (restartMsg) => {
  
        var restartID = { "message": restartMsg.id, "channel": restartMsg.channel.id, "exclusive": true }
        
              // Write the messaqe
        fs.writeFileSync(
          "../actions/restartMessaqe.json",
          JSON.stringify(restartID),
          function (err) {
            if (err) return console.error(`Somethinq qone G in updatinq the restart messaqe ID: ${err}`);
          });

        process.exit(); });

    } catch (e) {

      let restartEmbed = new client.disc.MessageEmbed()
        .setFooter(message.author.tag, message.author.avatarURL({ dynamic: true }))
        .setTimestamp()
        .setColor("E74C3C")
        .setTitle("503 Internal Execution Error")
        .setDescription(`There was an error executinq the requested command.\n\`\`\`js\n${e}\n\`\`\``);

      message.channel.send(restartEmbed);

    }
  } else {

    let restartEmbed = new client.disc.MessageEmbed()
      .setFooter(message.author.tag, message.author.avatarURL({ dynamic: true }))
      .setTimestamp()
      .setColor("E74C3C")
      .setTitle("403 Forbidden")
      .setDescription("You don't have permission to use that command!");

    return message.channel.send(restartEmbed);
  };
  return;
};
