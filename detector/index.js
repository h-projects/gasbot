const count = require('./counter');
const log = require('./logger');
const whitelist = require('./whitelist.json');

module.exports = async (client, message, database, edited) => {
  const levelNames = ['low', 'medium', 'high'];
  const detect = require(`./levels/${levelNames[database?.level ?? 1]}.js`);

  for (const word of whitelist) {
    if (RegExp(`\\b${word}\\b`, 'iu').test(message.content)) {
      return;
    }
  }

  if (!detect(message.content.replaceAll(/[.,]/gu, ''))) {
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
