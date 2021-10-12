module.exports = {
  name: 'detector',
  permissions: ['MANAGE_MESSAGES'],
  async execute(client, interaction) {
    const database = client.db.prepare('SELECT level FROM guilds WHERE id = ?').get(interaction.guildId);
    const statement = database ? 'UPDATE guilds SET level = @level WHERE id = @id' : 'INSERT INTO guilds (id, level) VALUES (@id, @level)';
    let description;

    switch (interaction.value) {
      case 'low':
        description = 'Successfully set detection level to **Low**!';
        client.db.prepare(statement).run({ id: interaction.guildId, level: 0 });
        break;

      case 'medium':
        description = 'Successfully set detection level to **Medium**!';
        client.db.prepare(statement).run({ id: interaction.guildId, level: 1 });
        break;

      case 'hiqh':
        description = 'Successfully set detection level to **Hiqh**!';
        client.db.prepare(statement).run({ id: interaction.guildId, level: 2 });
        break;
    }

    interaction.update({
      embeds: [{
        title: 'G Detector Levels',
        description,
        color: client.config.color
      }],
      components: [{
        type: 'ACTION_ROW',
        components: [
          {
            type: 'BUTTON',
            style: 'SECONDARY',
            label: 'Low',
            customId: `detector:low:${interaction.user.id}`,
            disabled: interaction.value === 'low'
          },
          {
            type: 'BUTTON',
            style: 'SECONDARY',
            label: 'Medium',
            customId: `detector:medium:${interaction.user.id}`,
            disabled: interaction.value === 'medium'
          },
          {
            type: 'BUTTON',
            style: 'SECONDARY',
            label: 'Hiqh',
            customId: `detector:hiqh:${interaction.user.id}`,
            disabled: interaction.value === 'hiqh'
          }
        ]
      }]
    });
  }
};