module.exports = {
  name: 'messageUpdate',
  once: false,
  async execute(oldMessage, newMessage, client) {
    if (newMessage.partial) {
      await newMessage.fetch();
    }

    if (newMessage.author.bot || newMessage.author.system || newMessage.type !== 'DEFAULT' || !newMessage.content) return;
    const database = client.db.prepare('SELECT * FROM guilds WHERE id = ?').get(newMessage.guildId);
    require('../detector/detector.js')(client, newMessage, database, true);
  }
};
