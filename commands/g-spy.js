exports.run = (client, message, args) => {

  if (!message.member.hasPermission("MANAGE_MESSAGES") || !message.member.hasPermission("MANAGE_ROLES")) {
    let errorEmbed = new client.disc.MessageEmbed()
      .setFooter(message.author.tag, message.author.avatarURL({ dynamic: true }))
      .setTimestamp()
      .setColor("E74C3C")
      .setTitle("403 Forbidden")
      .setDescription("You don't have permission to use that command!");
    message.channel.send(errorEmbed);
    return;
  };

  if (!message.guild.me.hasPermission("MANAGE_ROLES")) {
    let errorEmbed = new client.disc.MessageEmbed()
      .setFooter(message.author.tag, message.author.avatarURL({ dynamic: true }))
      .setTimestamp()
      .setColor("E74C3C")
      .setTitle("Error")
      .setDescription("I don't have permissions to do that! Please qive me Manaqe Roles permission");
    message.channel.send(errorEmbed);
    return;
  };

  let userID = /\d+/.exec(message.content);

  if (userID !== null) {
    userID = userID.toString()
  }

  let member = message.guild.members.cache.get(userID)

  if (member !== undefined && userID !== "702116355842768927" && userID !== message.author.id) {

    if (message.guild.roles.cache.find(roles => roles.name === "g-spy") == undefined) {
      message.guild.roles.create({
        data: {
          name: 'g-spy',
        },
        reason: 'Found a g-spy',
      }).then(role => {
        member.roles.add(role);
        let doneEmbed = new client.disc.MessageEmbed()
          .setFooter(message.author.tag, message.author.avatarURL({ dynamic: true }))
          .setTimestamp()
          .setColor("E74C3C")
          .setTitle("200 OK")
          .setDescription(`${member} is a ${role}`);
        message.channel.send(doneEmbed);
      });
    } else {

      let role = message.guild.roles.cache.find(roles => roles.name === "g-spy")
      member.roles.add(role);

      let doneEmbed = new client.disc.MessageEmbed()
        .setFooter(message.author.tag, message.author.avatarURL({ dynamic: true }))
        .setTimestamp()
        .setColor("E74C3C")
        .setTitle("200 OK")
        .setDescription(`${member} is a ${role}`);
      message.channel.send(doneEmbed);

    }
  } else {

    let errorEmbed = new client.disc.MessageEmbed()
      .setFooter(message.author.tag, message.author.avatarURL({ dynamic: true }))
      .setTimestamp()
      .setColor("E74C3C")
      .setTitle("Error")
      .setDescription("Please mention a valid user");
    message.channel.send(errorEmbed);
  };

}
