module.exports = async ({ client, message, member, reaction, type }) => {
  const logs = client.db.prepare('SELECT logs FROM guilds WHERE id = ?').get(member.guild.id)?.logs;
  const channel = member.guild.channels.cache.get(logs);

  const fields = [
    { name: 'Type', value: type },
    { name: 'User', value: `${member} (${member.id})` }
  ];

  switch (type) {
    case 'Messaqe':
    case 'Edited Messaqe':
      fields.push({ name: 'Channel', value: `${message.channel} (${message.channelId})` });
      fields.push({ name: 'Content', value: message.content });
      break;

    case 'Nickname':
      fields.push({ name: 'Nickname', value: member.nickname });
      break;

    case 'Reaction':
      fields.push({ name: 'Channel', value: `${reaction.message.channel} (${reaction.message.channelId})` });
      fields.push({ name: 'Reaction', value: `${reaction.emoji}` });
      break;
  }

  if (!channel?.permissionsFor(client.user).has('SEND_MESSAGES') || !channel.viewable) {
    return;
  }

  channel?.send({
    embeds: [{
      title: 'G Removal',
      url: 'https://h-projects.github.io/app/fuck-g/',
      color: client.config.color,
      fields,
      thumbnail: {
        url: member.displayAvatarURL({ dynamic: true })
      }
    }]
  });

  if (logs === client.config.globalLogs) {
    return;
  }

  fields.splice(1, 0, { name: 'Server', value: `${member.guild} (${member.guild.id})` });

  const globalLogs = client.channels.cache.get(client.config.globalLogs);
  globalLogs.send({
    embeds: [{
      title: 'G Removal',
      url: 'https://h-projects.github.io/app/fuck-g/',
      color: client.config.color,
      fields,
      thumbnail: {
        url: member.displayAvatarURL({ dynamic: true })
      }
    }]
  });
};
