module.exports = async (client, reaction, user) => {
  const fs = require("fs-extra")

    if (reaction.partial) {
        await reaction.fetch();
    }

    if (!reaction.message.channel.permissionsFor(client.user.id).has('MANAGE_MESSAGES')) { return; }

    // Remove the reaction
    if (reaction.emoji.name == '🇬') {
        reaction.remove(user);

        // Bots don't qet loqqed
        if (user.bot) { return; }

        // Make the global removed count qo up    
        client.badLetterCount.badLetterCount++;
        fs.writeFile(
          "./database/badLetterCount.json",
          JSON.stringify(client.badLetterCount),
          function (err) {
            if (err) return console.error(`Somethinq qone G in updatinq how much G's was posted: ${err}`);
          }
        );

        // Make the guild removed count qo up
        if (client.badLetterGuild[reaction.message.guild.id] !== undefined) {
          client.badLetterGuild[reaction.message.guild.id]++;
        } else {
          client.badLetterGuild[reaction.message.guild.id] = 1;
        }

        // Write the guild removed count
        fs.writeFile(
          "./database/badLetterGuild.json",
          JSON.stringify(reaction.client.badLetterGuild),
          function (err) {
            if (err) return console.error(`Somethinq qone G in updatinq how much G's was posted with a quild: ${err}`);
          }
        );

        // Make the user removed count qo up
        if (client.badLetterUser[user.id] !== undefined) {
          client.badLetterUser[user.id]++;
        } else {
          client.badLetterUser[user.id] = 1;
        }

        // Write the user removed count
        fs.writeFile(
          "./database/badLetterUser.json",
          JSON.stringify(client.badLetterUser),
          function (err) {
            if (err) return console.error(`Somethinq qone G in updatinq how much G's was posted with an user: ${err}`);
          }
        );
        
        // Find loqs channel
        let loqChannel = reaction.guild.channels.cache.get(client.loqs[reaction.guild.id]); 
        loqChannel ??= reaction.guild.channels.cache.find(channel => channel.name === "loqs");
      
        let centralLoq = client.channels.cache.get("805472059790589974");

        let loqEmbed = new client.disc.MessageEmbed()
          .setFooter("G.A.S Bot", client.user.avatarURL({ dynamic: true }))
          .setURL("https://h-projects.github.io/app/fuck-g/")
          .setThumbnail(user.avatarURL({ dynamic: true }))
          .setTimestamp()
          .setColor("E74C3C")
          .setTitle("G Removal")
          .addField("Type", "Reaction")
          .addField("User", `${user} (${user.id})`)
          .addField("Reaction", reaction.emoji.toString());

        let centralLoqEmbed = new client.disc.MessageEmbed()
          .setFooter("G.A.S Bot", client.user.avatarURL({ dynamic: true }))
          .setURL("https://h-projects.github.io/app/fuck-g/")
          .setThumbnail(user.avatarURL({ dynamic: true }))
          .setTimestamp()
          .setColor("E74C3C")
          .setTitle("G Removal")
          .addField("Type", "Reaction")
          .addField("User", `${user.tag} (${user.id})`)
          .addField("Server", `${reaction.message.guild} (${reaction.message.guild.id})`)
          .addField("Reaction", reaction.emoji.toString());
          
          // Send loqs messaqe
          if (loqChannel && loqChannel.permissionsFor(client.user.id).has('SEND_MESSAGES')) {
            loqChannel.send(loqEmbed); 
          }
          
          if (reaction.message.guild.id != "805472058954874941") { 
            centralLoq.send(centralLoqEmbed); 
          }
    }
}
