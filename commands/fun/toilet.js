module.exports = {
  name: 'toilet',
  description: 'polish toilet',
  async execute(client, message) {
    message.channel.send({
      embeds: [{
        title: 'polish toilet',
        image: {
          url: 'https://cdn.discordapp.com/attachments/713675042143076356/896325154232221706/GAS_Bot-Toilet-896325079493914634.gif'
        },
        color: client.config.color
      }]
    });
  }
};
