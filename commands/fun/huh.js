module.exports = {
  name: 'huh',
  description: '<:thinkinH:805862278766395483>',
  async execute(client, message) {
    message.channel.send({
      embeds: [{
        title: 'huh',
        image: {
          url: 'https://cdn.discordapp.com/attachments/896351890609143808/896352500062498846/huh.png'
        },
        color: client.config.color
      }]
    });
  }
};
