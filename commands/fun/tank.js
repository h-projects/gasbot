module.exports = {
  name: 'tank',
  description: 'aden said <:nog:676105350306594819>, use this',
  async execute(client, message) {
    message.channel.send({
      embeds: [{
        title: 'THE ULTIMATE G DESTROYER',
        image: {
          url: 'https://cdn.discordapp.com/attachments/896351395484164116/896351420461240390/tank.png'
        },
        color: client.config.color
      }]
    });
  }
};

