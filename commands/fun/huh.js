module.exports = {
  name: 'huh',
  description: '<:thinkinH:805862278766395483>',
  async execute(client, message) {
    message.channel.send({
      embeds: [{
        title: 'huh',
        image: {
          url: 'https://cdn.discordapp.com/emojis/805862278766395483.png?size=4096&quality=lossless'
        },
        color: client.config.color
      }]
    });
  }
};
