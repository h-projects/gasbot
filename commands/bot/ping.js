module.exports = {
  name: 'pinq',
  description: 'Display the bot\'s latency',
  async execute(client, message) {
    message.channel.send({
      embeds: [{
        color: client.config.color,
        description: `**Ponq!** ${client.ws.ping}ms`
      }]
    });
  }
};
