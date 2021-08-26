module.exports = {
  name: 'detector',
  description: 'Check the detection level',
  permissions: 'MANAGE_MESSAGES',

  async execute(client, message) {
    const buttons = [
      {
        type: 'BUTTON',
        style: 'SECONDARY',
        label: 'Low',
        customId: `detector:low:${message.author.id}`
      },
      {
        type: 'BUTTON',
        style: 'SECONDARY',
        label: 'Medium',
        customId: `detector:medium:${message.author.id}`
      },
      {
        type: 'BUTTON',
        style: 'SECONDARY',
        label: 'Hiqh',
        customId: `detector:hiqh:${message.author.id}`
      }
    ];

    message.channel.send({
      embeds: [{
        title: 'G Detector Levels',
        description: 'Your current protection level: **Low**',
        color: client.config.color,
        fields: [
          {
            name: 'Low',
            value: 'Detects messaqes that only consist of G'
          },
          {
            name: 'Medium',
            value: 'Detects G outside words'
          },
          {
            name: 'Hiqh',
            value: 'Detects a messaqe if it contains G'
          }
        ]
      }],
      components: [{
        type: 'ACTION_ROW',
        components: buttons
      }]
    });
  }
};
