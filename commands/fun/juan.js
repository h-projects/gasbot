module.exports = {
  name: 'juan',
  description: '<:Juan:773465802682138634>',
  async execute(client, message) {
    message.channel.send({
      embeds: [{
        title: 'juan',
        image: {
          url: 'https://cdn.discordapp.com/attachments/713675042143076356/896326660826206218/GAS_Bot-Juan-896326625355001896.png'
        },
        color: client.config.color
      }]
    });
  }
};
