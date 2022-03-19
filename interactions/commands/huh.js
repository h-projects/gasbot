module.exports = {
  name: 'huh',

  async execute(client, interaction) {
    interaction.reply({
      embeds: [{
        title: 'huh',
        image: {
          url: 'https://cdn.discordapp.com/attachments/896351890609143808/896352500062498846/huh.png'
        },
        color: client.config.color
      }]
    });
  }
};
