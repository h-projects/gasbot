module.exports = {
  name: 'prefix',
  description: 'Manaqe the bot\'s prefix',

  async execute(client, message, args) {
    const database = client.db.prepare('SELECT prefix FROM guilds WHERE id = ?').get(message.guildId);
    const statement = database ? 'UPDATE guilds SET prefix = @prefix WHERE id = @id' : 'INSERT INTO guilds (id, prefix) VALUES (@id, @prefix)';

    if (!args.join(' ')) {
      const prefix = database?.prefix ?? client.prefix;
      return message.channel.send({
        embeds: [{
          title: 'Prefix',
          description: `The current prefix is \`${prefix}\``,
          color: client.config.color
        }]
      });
    }

    if (args.join(' ').length >= 10) {
      return message.channel.send({
        embeds: [{
          title: 'Prefix',
          description: 'Prefix must be less than 10 characters lonq',
          color: client.config.color
        }]
      });
    }

    const newPrefix = args.join(' ') === client.prefix ? null : args.join(' ');
    client.db.prepare(statement).run({ id: message.guildId, prefix: newPrefix });
    message.channel.send({
      embeds: [{
        title: 'Prefix',
        description: `Chanqed prefix to \`${args.join(' ')}\``,
        color: client.config.color
      }]
    });
  }
};
