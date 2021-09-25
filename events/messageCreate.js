module.exports = {
  name: 'messageCreate',
  once: false,
  async execute(message, client) {
    if (message.author.bot || message.author.system || message.type !== 'DEFAULT' || !message.content) return;

    const database = client.db.prepare('SELECT * FROM guilds WHERE id = ?').get(message.guildId);
    message.prefix = database?.prefix ?? client.prefix;

    const array = message.content.replace(message.prefix, '').split(' ');
    const args = array.slice(1);
    const [ command ] = array;

    const badLetterDetected = await require('../detector/detector.js')(client, message, database);

    if (badLetterDetected || !client.commands.has(command) || !message.content.startsWith(message.prefix)) return;

    if (!message.member.permissions.has(command.permissions ?? 0)) {
      return message.channel.send(`You need the \`${command.permissions}\` permission to use this command`);
    }

    client.commands.get(command).execute(client, message, args);
  }
};
