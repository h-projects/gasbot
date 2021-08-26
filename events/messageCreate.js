module.exports = {
  name: 'messageCreate',
  once: false,
  async execute(message, client) {
    const array = message.content.replace(client.prefix, '').split(' ');
    const args = array.slice(1);
    const [ command ] = array;

    const exceptions = message.author.bot || message.author.system || message.type !== 'DEFAULT' || !message.content;
    if (exceptions) return;

    if (!client.commands.has(command) || !message.content.startsWith(client.prefix)) return;
    client.commands.get(command).execute(client, message, args);
  }
};
