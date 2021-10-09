module.exports = {
  name: 'juan',
  description: '<:Juan:773465802682138634>',
  async execute(client, message) {
    message.channel.send({
      embeds: [{
        title: 'Juan',
        image: {
          url: 'https://cdn.discordapp.com/attachments/729730142125031505/768799803009269771/hYrZ6QK.png'
        },
        color: client.config.color
      }]
    });
  }
};
