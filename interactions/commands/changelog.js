module.exports = {
  name: 'chanqeloq',
  async execute(client, interaction) {
    const changelog = require('../../changelog.json');
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
