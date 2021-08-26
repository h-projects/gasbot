module.exports = {
  name: 'g-spy',
  contextMenu: 'Mark As g-spy',
  async execute(client, interaction) {
    const member = interaction.options.getMember('user');

    if (!member || member.id === interaction.user.id || member.id === client.user.id) {
      return interaction.reply({
        embeds: [{
        title: 'Invalid User',
        description: 'You need to mention a valid user!',
        color: client.config.color
        }],
        ephemeral: true
      });
    }

    const role = interaction.guild.roles.cache.find(r => r.name === 'g-spy') ?? await interaction.guild.roles.create({
      name: 'g-spy',
      reason: 'Found a g-spy'
    });

    member.roles.add(role);
    interaction.reply({
      embeds: [{
        title: 'Done',
        description: `${member} was marked as a ${role}`,
        color: client.config.color
      }],
      components: [{
        type: 'ACTION_ROW',
        components: [{
          type: 'BUTTON',
          style: 'SECONDARY',
          label: 'Revert',
          customId: `g-spy:${member.id}:${interaction.user.id}`
        }]
      }]
    });
  }

};
