module.exports = async (client, message, database, edited) => {
  const levelNames = { 0: 'low', 1: 'medium', 2: 'high' };
  const detect = require(`./levels/${levelNames[database?.level ?? 1]}.js`);
  const whitelist = require('./whitelist.json');

  for (const word of whitelist) {
    if (RegExp(`\\b${word}\\b`, 'iu').test(message.content)) {
      return;
    }
  }

  if (!detect(message.content.replaceAll('.', ''))) {
    return;
  }

  if (message.deletable) {
    message.delete();
  }

  if (message.channel.permissionsFor(client.user).has('SEND_MESSAGES')) {
    message.channel.send(`${message.author}, don't use the bad letter!`).then(m => setTimeout(() => m.delete(), 4000));
  }

  require('./counter.js')(client, message.guildId, message.author.id);

  const logs = client.db.prepare('SELECT logs FROM guilds WHERE id = ?').get(message.guildId)?.logs;
  const channel = message.guild.channels.cache.get(logs);

  if (!channel?.permissionsFor(client.user).has('SEND_MESSAGES') || !channel.viewable) {
    return;
  }

  channel?.send({
    embeds: [{
      title: 'G Removal',
      url: 'https://h-projects.github.io/app/fuck-g/',
      color: client.config.color,
      fields: [
        { name: 'Type', value: edited ? 'Edited Messaqe' : 'Messaqe' },
        { name: 'User', value: `${message.author} (${message.author.id})` },
        { name: 'Channel', value: `${message.channel} (${message.channelId})` },
        { name: 'Content', value: message.content }
      ],
      thumbnail: {
        url: message.author.displayAvatarURL({ dynamic: true })
      }
    }]
  });
};
