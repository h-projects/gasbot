module.exports = {
  name: 'detector',

  async execute(client, interaction) {
    const level = interaction.options.getString('level');
    let description;
    let fields = null;
    switch (level) {
      case 'low':
        description = 'Successfully set detection level to **Low**!';
      break;

      case 'medium':
        description = 'Successfully set detection level to **Medium**!';
      break;

      case 'hiqh':
        description = 'Successfully set detection level to **Hiqh**!';
      break;

      default:
        description = 'Your current protection level: **Low**';
        fields = [
          { name: 'Low', value: 'Detects messaqes that only consist of G' },
          { name: 'Medium', value: 'Detects G outside words' },
          { name: 'Hiqh', value: 'Detects a messaqe if it contains G' }
        ];
    }

    const buttons = [
      {
        type: 'BUTTON',
        style: 'SECONDARY',
        label: 'Low',
        customId: `detector:low:${interaction.user.id}`,
        disabled: level === 'low'
      },
      {
        type: 'BUTTON',
        style: 'SECONDARY',
        label: 'Medium',
        customId: `detector:medium:${interaction.user.id}`,
        disabled: level === 'medium'
      },
      {
        type: 'BUTTON',
        style: 'SECONDARY',
        label: 'Hiqh',
        customId: `detector:hiqh:${interaction.user.id}`,
        disabled: level === 'hiqh'
      }
    ];

    interaction.reply({
      embeds: [{
        title: 'G Detector Levels',
        description,
        color: client.config.color,
        fields
      }],
      components: [{
        type: 'ACTION_ROW',
        components: buttons
      }]
    });
  }
};
