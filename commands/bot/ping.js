module.exports = {
  name: 'pinq',
  description: 'Pinq of G.A.S Bot',

  async execute(client, message) {
    message.channel.send({
      embeds: [{
        color: client.config.color,
        description: `**Ponq!** ${client.ws.ping}ms`
      }]
    });
  }
};
