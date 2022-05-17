const detect = require('../detector');

module.exports = {
  name: 'messageUpdate',
  once: false,
  async execute(oldMessage, newMessage, client) {
    if (newMessage.partial) {
      try {
        await newMessage.fetch();
      } catch {
        return console.warn('Failed to fetch partial edited message');
      }
    }

    const { author, type } = newMessage;
    if (author.bot || author.system || type !== 'DEFAULT' && type !== 'REPLY' || !newMessage.content || !newMessage.channel.permissionsFor(client.user).has('SEND_MESSAGES')) {
      return;
    }

    const database = client.db.prepare('SELECT * FROM guilds WHERE id = ?').get(newMessage.guildId);
    detect(client, newMessage, database, true);
  }
};
