module.exports = {
  name: 'messageCreate',
  once: false,
  async execute(message, client) {
    if (message.author.bot || message.author.system || message.type !== 'DEFAULT' || !message.content) {
      return;
    }
    const database = client.db.prepare('SELECT * FROM guilds WHERE id = ?').get(message.guildId);
    message.prefix = database?.prefix ?? client.prefix;

    const array = message.content.replace(message.prefix, '').split(' ');
    const args = array.slice(1);

    const badLetterDetected = await require('../detector/detector.js')(client, message, database);
    if (badLetterDetected || !client.commands.has(array[0]) || !message.content.startsWith(message.prefix) || !message.channel.permissionsFor(client.user).has('SEND_MESSAGES')) {
      return;
    }

    const command = client.commands.get(array[0]);
    if (!message.member.permissions.has(command.permissions ?? 0n)) {
      return message.channel.send(`You need the \`${command.permissions}\` permission to use this command`);
    }

    if (!message.guild.me.permissions.has(command.botPermissions ?? 0n)) {
      return message.channel.send({
        embeds: [{
          title: 'Missinq Permissions',
          description: `I need the \`${command.botPermissions}\` permission to use this command`,
          color: client.config.color
        }]
      });
    }

    command.execute(client, message, args);
  }
};
