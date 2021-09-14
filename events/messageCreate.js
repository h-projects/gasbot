module.exports = {
  name: 'messageCreate',
  once: false,
  async execute(message, client) {
    if (message.author.bot || message.author.system || message.type !== 'DEFAULT' || !message.content) return;

    const database = client.db.prepare('SELECT prefix FROM guilds WHERE id = ?').get(message.guildId);
    message.prefix = database?.prefix ?? client.prefix;

    const array = message.content.replace(message.prefix, '').split(' ');
    const args = array.slice(1);
    const [ command ] = array;


    if (!client.commands.has(command) || !message.content.startsWith(message.prefix)) return;
    client.commands.get(command).execute(client, message, args);
  }
};
