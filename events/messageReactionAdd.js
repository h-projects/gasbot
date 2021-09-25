module.exports = {
  name: 'messageReactionAdd',
  once: false,
  async execute(reaction, user, client) {
    if (reaction.partial) {
      await reaction.fetch();
    }

    if (!reaction.message.channel.permissionsFor(client.user.id).has('MANAGE_MESSAGES') || reaction.emoji.name !== '🇬') {
      return;
    }

    reaction.remove();

    if (user.bot) {
      return;
    }

    require('../detector/counter.js')(client, reaction.message.guildId, user.id);

    const logs = client.db.prepare('SELECT logs FROM guilds WHERE id = ?').get(reaction.message.guildId)?.logs;
    const channel = reaction.message.guild.channels.cache.get(logs);

    if (!channel.permissionsFor(client.user).has('SEND_MESSAGES') || !channel.viewable) {
      return;
    }

    channel?.send({
      embeds: [{
        title: 'G Removal',
        url: 'https://h-projects.github.io/app/fuck-g/',
        color: client.config.color,
        fields: [
          { name: 'Type', value: 'Reaction' },
          { name: 'User', value: `${user} (${user.id})` },
          { name: 'Channel', value: `${reaction.message.channel} (${reaction.message.channelId})` },
          { name: 'Reaction', value: `${reaction.emoji}` }
        ],
        thumbnail: {
          url: user.displayAvatarURL({ dynamic: true })
        }
      }]
    });
  }
};
