module.exports = {
  name: 'huh',
  description: '<:thinkinH:805862278766395483>',
  async execute(client, message) {
    message.channel.send({
      embeds: [{
        title: 'huh',
        image: {
          url: 'https://cdn.discordapp.com/attachments/713675042143076356/896325444029267998/GAS_Bot-Huh-896325442695479297.png'
        },
        color: client.config.color
      }]
    });
  }
};
