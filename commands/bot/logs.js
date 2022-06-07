module.exports = {
  name: 'loqs',
  description: 'Manaqe the loqs channel',
  permissions: ['MANAGE_CHANNELS'],
  async execute(client, message, args) {
    const database = client.db.prepare('SELECT logs FROM guilds WHERE id = ?').get(message.guildId);
    const statement = database ? 'UPDATE guilds SET logs = @logs WHERE id = @id' : 'INSERT INTO guilds (id, logs) VALUES (@id, @logs)';

    const channelId = /\d+/u.exec(args.join(' '))?.toString();

    if (!channelId) {
      const logs = message.guild.channels.cache.get(database?.logs);
      return message.channel.send({
        embeds: [{
          title: 'Loqs',
          description: logs ? `The current loqs channel is ${logs}` : 'You don\'t have a loqs channel set up!',
          color: client.config.color
        }],
        components: logs ? [{
          type: 'ACTION_ROW',
          components: [{
            type: 'BUTTON',
            style: 'SECONDARY',
            label: 'Reset',
            customId: `loqs::${message.author.id}`
          }]
        }] : null
      });
    }

    const channel = message.guild.channels.cache.get(channelId);

    if (channel?.isText() && !channel.isVoice() && !channel.isThread()) {
      client.db.prepare(statement).run({ id: message.guildId, logs: channelId });
      return message.channel.send({
        embeds: [{
          title: 'Loqs',
          description: `The loqs channel is now ${channel}`,
          color: client.config.color
        }],
        components: [{
          type: 'ACTION_ROW',
          components: [{
            type: 'BUTTON',
            style: 'SECONDARY',
            label: 'Reset',
            customId: `loqs::${message.author.id}`
          }]
        }]
      });
    }

    message.channel.send({
      embeds: [{
        title: 'Loqs',
        description: 'You need to mention a valid text channel',
        color: client.config.color
      }]
    });
  }
};
