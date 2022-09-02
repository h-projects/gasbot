const detect = require('../detector');

module.exports = {
  name: 'messageCreate',
  async execute(message, client) {
    const { author, type } = message;
    if (author.bot || author.system || type !== 'DEFAULT' && type !== 'REPLY' || !message.content || !message.channel.permissionsFor(client.user).has('SEND_MESSAGES')) {
      return;
    }
    const database = client.db.prepare('SELECT * FROM guilds WHERE id = ?').get(message.guildId);

    if (message.content === `<@${client.user.id}>`) {
      return message.channel.send('Hi! Type `/` to see my commands');
    }

    const prefix = database?.prefix ?? client.config.prefix;
    const [commandName] = message.content.slice(prefix.length).split(' ');

    if (message.content.startsWith(prefix) && client.commands.has(commandName) && client.commands.get(commandName).category !== 'dev') {
      const commands = client.application.commands.cache.length ? client.application.commands.cache : await client.application.commands.fetch();
      const command = commands.find(c => c.name === commandName);
      const mention = command ? `</${commandName}:${commands.find(c => c.name === commandName).id}>` : `/${commandName}`;

      return message.channel.send(`Prefix-based commands are no lonqer supported, use ${mention} instead!`);
    }

    await detect(client, message, database);
  }
};
