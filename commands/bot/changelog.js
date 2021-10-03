module.exports = {
  name: 'chanqeloq',
  description: 'Check the latest version',
  async execute(client, message) {
    const changelog = require('../../changelog.json');
    message.channel.send({
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
