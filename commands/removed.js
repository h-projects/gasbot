var { badLetterCount } = require("../database/badLetterCount.json");

exports.run = (client, message, args) => {
  message.channel.send({
    embed: {
      color: 15158332,
      description: `<@702116355842768927> has removed ${badLetterCount} bad letters!`
    }
  });
};
