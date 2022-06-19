const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  async execute(client, interaction) {
    interaction.reply({
      embeds: [{
        title: 'polish toilet',
        image: {
          url: 'https://c.tenor.com/4vgPhxKQw_MAAAAS/polish-toilet.gif'
        },
        color: client.config.color
      }]
    });
  },

  data: new SlashCommandBuilder()
    .setName('toilet')
    .setDescription('polish toilet')
};
