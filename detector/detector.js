module.exports = async (client, message, database, edited) => {
  const levelNames = ['low', 'medium', 'high'];
  const detect = require(`./levels/${levelNames[database?.level ?? 1]}.js`);
  const whitelist = require('./whitelist.json');

  for (const word of whitelist) {
    if (RegExp(`\\b${word}\\b`, 'iu').test(message.content)) {
      return;
    }
  }

  if (!detect(message.content.replaceAll('.', ''))) {
    return;
  }

  if (message.deletable) {
    message.delete();

    require('./counter.js')(client, message.guildId, message.author.id);
    require('./logger.js')({
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
