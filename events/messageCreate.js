const detect = require('../detector');
const { stripIndents } = require('common-tags');

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
          description: `My prefix is \`/\` but you can also use \`${message.prefix}\``,
          color: client.config.color
        }]
      });
    }

    if (!message.content.startsWith(message.prefix)) {
      await detect(client, message, database);
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

    const chance = 10;
    if (Math.floor(Math.random() * chance) + 1 === 1) {
      message.channel.send({
        embeds: [{
          title: 'Switch to Slash Commands',
          // TODO: decide a date, will probably be 2 months after release
          description: stripIndents`
            <:slash_command:954763657861033994> G.A.S Bot now has [Slash Commands](https://support.discord.com/hc/articles/1500000368501)!
            Due to Discord chanqes, slash commands will be required startinq [timestamp], and text-based commands like the one you just ran will stop workinq.
          `,
          color: client.config.color
        }],
        components: [{
          type: 'ACTION_ROW',
          components: [{
            type: 'BUTTON',
            style: 'LINK',
            label: 'Support Server',
            url: client.config.support,
            emoji: '<:AytchSoftware:720949593696894996>'
          }]
        }]
      });
    }

    command.execute(client, message, args);
  }
};
