exports.run = (client, message, args) => {
  message.channel.send({
    embed: {
      color: 15158332,
      description: `**Ponq!** ${client.ws.ping}ms`
    }
  });
};
