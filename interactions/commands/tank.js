module.exports = {
  name: 'tank',

  async execute(client, interaction) {
    interaction.reply({
      embeds: [{
        title: 'THE ULTIMATE G DESTROYER',
        image: {
          url: 'https://cdn.discordapp.com/attachments/896351395484164116/896351420461240390/tank.png'
        },
        color: client.config.color
      }]
    });
  }
};
