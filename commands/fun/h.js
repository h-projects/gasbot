module.exports = {
  name: 'h',
  description: 'h',
  async execute(client, message) {
    message.channel.send({
      embeds: [{
        title: 'h',
        image: {
          url: 'https://cdn.discordapp.com/attachments/439531641539526666/861256439209394176/arg-h-trans.gif'
        },
        color: client.config.color
      }]
    });
  }
};
