exports.run = (client, message, args) => {
    var userID = /\d+/.exec(message.content);

    if (userID === null) {
        var userID = message.author.id
    } else {
        var userID = userID.toString()
    }

    if (client.badLetterGuild[message.guild.id] === undefined) {
        client.badLetterGuild[message.guild.id] = 0;
    }

    let member = message.guild.members.cache.get(userID)

    if (member === undefined) {

        if (client.badLetterUser[message.author.id] === undefined) {
            client.badLetterUser[message.author.id] = 0;
        }

        var removedUserText = `Removed ${client.badLetterUser[message.author.id]} bad letters from ${message.author}`

    } else {

        if (client.badLetterUser[userID] === undefined) {
            client.badLetterUser[userID] = 0;
        }

        var removedUserText = `Removed ${client.badLetterUser[userID]} bad letters from ${member}`

    }

    let removedEmbed = new client.disc.MessageEmbed()
        .setColor("E74C3C")
        .setTitle("__Bad Letters Removed__")
        .setDescription(`Removed ${client.badLetterCount.badLetterCount} bad letters in total`)
        .addField("Server", `Removed ${client.badLetterGuild[message.guild.id]} bad letters in this server`)
        .addField("User", removedUserText)
        .setTimestamp()
        .setFooter(message.author.tag, message.author.avatarURL({ dynamic: true }));

    message.channel.send(removedEmbed);

};
