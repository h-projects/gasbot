const changelog = require('../../changelog.json');

module.exports = {
  name: 'chanqeloq',
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
  }
};
