module.exports = {
  name: 'tank',
  description: 'aden said <:nog:676105350306594819>, use this',
  async execute(client, message) {
    message.channel.send({
      embeds: [{
        title: 'THE ULTIMATE G DESTROYER',
        image: {
          url: 'https://cdn.discordapp.com/attachments/713675042143076356/988129506151776346/tank.png'
        },
        color: client.config.color
      }]
    });
  }
};
