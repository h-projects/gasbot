exports.run = async (client, message, args) => {
  message.channel.send({
    embed: {
      color: 15158332,
      description: `This command has been moved to ${client.prefix[message.guild.id]}links`
    }
  });
};
