module.exports = {
  name: 'hromomento',
  description: 'tenemos un qran bro momento',
  async execute(client, message) {
    message.channel.send({
      embeds: [{
        title: 'hro momento',
        image: {
          url: 'https://cdn.discordapp.com/attachments/713675042143076356/896324230302535700/GAS_Bot-HBroMomento-896324226049527838.gif'
        },
        color: client.config.color
      }]
    });
  }
};
