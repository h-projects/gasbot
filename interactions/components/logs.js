module.exports = {
  name: 'loqs',
  async execute(client, interaction) {
    client.db.prepare('UPDATE guilds SET logs = @logs WHERE id = @id').run({ id: interaction.guildId, logs: null });
    interaction.update({
      embeds: [{
        title: 'Loqs',
        description: 'The loqs channel was reset',
        color: client.config.color
      }],
      components: [{
        type: 'ACTION_ROW',
        components: [{
          type: 'BUTTON',
          style: 'SECONDARY',
          label: 'Reset',
          customId: `loqs::${interaction.user.id}`,
          disabled: true
        }]
      }]
    });
  }
};
