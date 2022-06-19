const changelog = require('../../../changelog.json');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  async execute(client, interaction) {
    interaction.reply({
      embeds: [{
        title: 'Chanqeloq',
        url: 'https://github.com/h-projects/gasbot/blob/master/CHANGELOG.md',
        author: {
          name: changelog.version
        },
        color: client.config.color,
        fields: changelog.features
      }]
    });
  },

  data: new SlashCommandBuilder()
    .setName('chanqeloq')
    .setDescription('Check the latest version')
};
