module.exports = {
  name: 'messageCreate',
  once: false,
  async execute(message, client) {
    const { author, type } = message;
    if (author.bot || author.system || type !== 'DEFAULT' && type !== 'REPLY' || !message.content || !message.channel.permissionsFor(client.user).has('SEND_MESSAGES')) {
      return;
    }
    const database = client.db.prepare('SELECT * FROM guilds WHERE id = ?').get(message.guildId);
    message.prefix = database?.prefix ?? client.config.prefix;

    const array = message.content.replace(message.prefix, '').split(' ');
    const args = array.slice(1);

    if (message.content === `<@${client.user.id}>` || message.content === `<@!${client.user.id}>`) {
      return message.channel.send({
        embeds: [{
          title: 'Prefix',
          description: `My prefix is \`${message.prefix}\``,
          color: client.config.color
        }]
      });
    }

    if (!message.content.startsWith(message.prefix)) {
      await require('../detector/detector.js')(client, message, database);
      return;
    }

    if (!client.commands.has(array[0])) {
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
