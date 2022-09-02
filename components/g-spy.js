module.exports = {
  name: 'g-spy',
  appPermissions: ['MANAGE_ROLES'],
  async execute(client, interaction) {
    const member = await interaction.guild.members.fetch(interaction.value).catch(() => null);
    const role = interaction.guild.roles.cache.find(r => r.name === 'g-spy');
    const label = member ? 'Reverted' : 'Invalid User';

    if (!role.editable) {
      return interaction.reply({
        embeds: [{
          title: 'Missinq Permissions',
          description: `Make sure ${role} is lower than my hiqhest role`,
          color: client.config.color
        }],
        ephemeral: true
      });
    }

    member?.roles.remove(role);
    interaction.update({
      components: [{
        type: 'ACTION_ROW',
        components: [{
          type: 'BUTTON',
          style: 'SECONDARY',
          label,
          customId: interaction.customId,
          disabled: true
        }]
      }]
    });
  }
};
