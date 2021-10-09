module.exports = {
  name: 'prefix',
  description: 'Manaqe the bot\'s prefix',
  permissions: ['MANAGE_MESSAGES'],
  async execute(client, message, args) {
    const database = client.db.prepare('SELECT prefix FROM guilds WHERE id = ?').get(message.guildId);
    const statement = database ? 'UPDATE guilds SET prefix = @prefix WHERE id = @id' : 'INSERT INTO guilds (id, prefix) VALUES (@id, @prefix)';
    const badLetters = require('../../detector/detection.json').join('');
    const detector = RegExp(`[${badLetters}]`, 'giu');

    if (!args.join(' ')) {
      return message.channel.send({
        embeds: [{
          title: 'Prefix',
          description: `The current prefix is \`${message.prefix}\``,
          color: client.config.color
        }]
      });
    }

    if (args.join(' ').length >= 10 || detector.test(args.join(' '))) {
      return message.channel.send({
        embeds: [{
          title: 'Invalid Prefix',
          description: 'It must be shorter than 10 characters and it can\'t contain the bad letter',
          color: client.config.color
        }]
      });
    }

    const newPrefix = args.join(' ') === client.config.prefix ? null : args.join(' ');
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
