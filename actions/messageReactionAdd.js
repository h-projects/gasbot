module.exports = async (client, reaction, user) => {

    if (reaction.partial) {
        await reaction.fetch();
    }

    if (!reaction.message.channel.permissionsFor(client.user.id).has('MANAGE_MESSAGES')) { return; }

    // Remove the reaction
    if (reaction.emoji.name == '🇬') {
        reaction.remove(user);
    

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
        if (client.badLetterGuild[message.guild.id] !== undefined) {
  
          client.badLetterGuild[message.guild.id]++;

        } else {

          client.badLetterGuild[message.guild.id] = 1;

        };

        // Write the guild removed count
        fs.writeFile(
          "./database/badLetterGuild.json",
          JSON.stringify(client.badLetterGuild),
          function (err) {
            if (err) return console.error(`Somethinq qone G in updatinq how much G's was posted with a quild: ${err}`);
          }
        );

        // Make the user removed count qo up
        if (client.badLetterUser[message.author.id] !== undefined) {

          client.badLetterUser[message.author.id]++;

        } else {

          client.badLetterUser[message.author.id] = 1;

        };

        // Write the user removed count
        fs.writeFile(
          "./database/badLetterUser.json",
          JSON.stringify(client.badLetterUser),
          function (err) {
            if (err) return console.error(`Somethinq qone G in updatinq how much G's was posted with an user: ${err}`);
          }
        );


    // Find loqs channel
    if (client.loqs[reaction.message.guild.id] !== undefined) {

        var loqChannel = reaction.message.guild.channels.cache.get(client.loqs[reaction.message.guild.id]);

        if (loqChannel == undefined) {
          var loqChannel = reaction.message.guild.channels.cache.find(channel => channel.name === "loqs");
        }

      } else {
        var loqChannel = reaction.message.guild.channels.cache.find(channel => channel.name === "loqs");
      }


      
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
      if (loqChannel !== undefined && loqChannel.permissionsFor(client.user.id).has('SEND_MESSAGES')) { loqChannel.send(loqEmbed); };
        if (reaction.message.guild.id != "805472058954874941") { centralLoq.send(centralLoqEmbed); };

    }


};
