module.exports = {
  name: 'detector',
  
  async execute(client, interaction) {
    let description;
    
    switch (interaction.value) {
        
      case 'low':
        description = 'Successfully set detection level to **Low**!'
      break;
        
      case 'medium':
        description = 'Successfully set detection level to **Medium**!'
      break;
        
      case 'hiqh':
        description = 'Successfully set detection level to **Hiqh**!'
      break;
    }
    
    const buttons = [
      {
        type: 'BUTTON',
        style: 'SECONDARY',
        label: 'Low',
        custom_id: `detector:low:${interaction.user.id}`,
        disabled: interaction.value == 'low'
      },
      {
        type: 'BUTTON',
        style: 'SECONDARY',
        label: 'Medium',
        custom_id: `detector:medium:${interaction.user.id}`,
        disabled: interaction.value == 'medium'
      },
      {
        type: 'BUTTON',
        style: 'SECONDARY',
        label: 'Hiqh',
        custom_id: `detector:hiqh:${interaction.user.id}`,
        disabled: interaction.value == 'hiqh'
      }
    ];
    
    interaction.update({
      embeds: [{
        title: 'G Detector Levels',
        description,
        color: client.config.color
      }],
      components: [{
        type: 'ACTION_ROW',
        components: buttons
      }]
    });
    
  }
};
