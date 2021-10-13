module.exports = {
  name: 'messageUpdate',
  once: false,
  async execute(oldMessage, newMessage, client) {
    if (newMessage.partial) {
      await newMessage.fetch();
    }

    const { author, type } = newMessage;
    if (author.bot || author.system || type !== 'DEFAULT' && type !== 'REPLY' || !newMessage.content || !newMessage.channel.permissionsFor(client.user).has('SEND_MESSAGES')){
      return;
    }

    const database = client.db.prepare('SELECT * FROM guilds WHERE id = ?').get(newMessage.guildId);
    require('../detector/detector.js')(client, newMessage, database, true);
  }
};
