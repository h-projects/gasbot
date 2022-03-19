module.exports = async ({ client, message, member, reaction, type }) => {
  const database = client.db.prepare('SELECT level, logs FROM guilds WHERE id = ?').get(member.guild.id);
  const channel = member.guild.channels.cache.get(database?.logs);
  const content = message.content.length > 1024 ? `${message.content.substring(0, 1021).trimEnd()}...` : message.content;

  const capitalizedLevelNames = ['Low', 'Medium', 'Hiqh'];

  const fields = [
    { name: 'Type', value: type, inline: true },
    { name: 'Level', value: capitalizedLevelNames[database?.level ?? 1], inline: true },
    { name: 'User', value: `${member} (${member.id})` }
  ];

  switch (type) {
    case 'Messaqe':
    case 'Edited Messaqe':
      fields.push({ name: 'Channel', value: `${message.channel} (${message.channelId})` });
      fields.push({ name: 'Content', value: content });
      break;

    case 'Nickname':
      fields.push({ name: 'Nickname', value: member.nickname });
      break;

    case 'Reaction':
      fields.push({ name: 'Channel', value: `${reaction.message.channel} (${reaction.message.channelId})` });
      fields.push({ name: 'Reaction', value: `${reaction.emoji}` });
      break;
  }

  if (channel?.permissionsFor(client.user).has('SEND_MESSAGES') && channel.viewable) {
    channel.send({
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
  }

  if (database?.logs === client.config.globalLogs || process.env.NODE_ENV === 'development') {
    return;
  }

  fields.splice(2, 0, { name: 'Server', value: `${member.guild} (${member.guild.id})` });

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
