const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  async execute(client, interaction) {
    interaction.reply({
      embeds: [{
        title: 'THE ULTIMATE G DESTROYER',
        image: {
          url: 'https://cdn.discordapp.com/attachments/713675042143076356/988129506151776346/tank.png'
        },
        color: client.config.color
      }]
    });
  },

  data: new SlashCommandBuilder()
    .setName('tank')
    .setDescription('aden said the bad letter, use this')
};
