module.exports = {
  name: 'g-spy',
  
  async execute(client, interaction) {
    const member = await interaction.guild.members.fetch(interaction.value).catch(() => null);
    const role = interaction.guild.roles.cache.find(role => role.name == 'g-spy');
    const label = member ? 'Reverted' : 'Invalid User';
    
    member?.roles.remove(role);
    
    interaction.update({
      components: [{
        type: 'ACTION_ROW',
        components: [{
          type: 'BUTTON',
          style: 'SECONDARY',
          label,
          custom_id: interaction.customId,
          disabled: true
        }]
      }]
    });

  }
}
