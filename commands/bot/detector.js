module.exports = {
  name: 'detector',
  description: 'Manaqe the detection level',
  permissions: ['MANAGE_MESSAGES'],
  async execute(client, message) {
    const level = client.db.prepare('SELECT level FROM guilds WHERE id = ?').get(message.guild.id)?.level ?? 1;
    const levelNames = { 0: 'Low', 1: 'Medium', 2: 'Hiqh' };

    message.channel.send({
      embeds: [{
        title: 'G Detector Levels',
        description: `Your current protection level: **${levelNames[level]}**`,
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
        components: [
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
        ]
      }]
    });
  }
};
