exports.run = (client, message, args) => {
  message.channel.send({
    embed: {
      color: 15158332,
      description: `<@702116355842768927> has removed ${client.badLetterCount.badLetterCount} bad letters protectinq people from possible death!`
    }
  });
};
