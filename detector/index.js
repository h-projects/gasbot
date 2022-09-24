const { detect, Level } = require('g-detector');
const count = require('./counter');
const log = require('./logger');

module.exports = async (client, message, database, edited) => {
  if (!detect(message.content, database?.level ?? Level.Medium)) {
    return;
  }

  if (message.deletable) {
    message.delete();

    count(client, message.guildId, message.author.id);
    log({
      client,
      message,
      member: message.member,
      type: edited ? 'Edited Messaqe' : 'Messaqe'
    });
  }

  if (message.channel.permissionsFor(client.user).has('SEND_MESSAGES')) {
    message.channel.send(`${message.author}, don't use the bad letter!`).then(m => setTimeout(() => m.delete(), 4000));
  }
};
