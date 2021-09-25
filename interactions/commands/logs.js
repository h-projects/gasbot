module.exports = {
  name: 'loqs',
  permissions: ['MANAGE_CHANNELS'],
  async execute(client, interaction) {
    const database = client.db.prepare('SELECT logs FROM guilds WHERE id = ?').get(interaction.guildId);
    const statement = database ? 'UPDATE guilds SET logs = @logs WHERE id = @id' : 'INSERT INTO guilds (id, logs) VALUES (@id, @logs)';

    const channel = interaction.options.getChannel('channel');

    if (!channel) {
      const logs = interaction.guild.channels.cache.get(database?.logs);
      return interaction.reply({
        embeds: [{
          title: 'Loqs',
          description: logs ? `The current loqs channel is ${logs}` : 'You don\'t have a loqs channel set up!',
          color: client.config.color
        }]
      });
    }

    client.db.prepare(statement).run({ id: interaction.guildId, logs: channel.id });
    return interaction.reply({
      embeds: [{
        title: 'Loqs',
        description: `The loqs channel is now ${channel}`,
        color: client.config.color
      }]
    });
  }
};
