const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionFlagsBits } = require('discord-api-types/v10');

const badLetters = require('../../../detector/detection.json').join('');
const detector = RegExp(`[${badLetters}]`, 'giu');

module.exports = {
  async execute(client, interaction) {
    const database = client.db.prepare('SELECT prefix FROM guilds WHERE id = ?').get(interaction.guildId);
    const statement = database ? 'UPDATE guilds SET prefix = @prefix WHERE id = @id' : 'INSERT INTO guilds (id, prefix) VALUES (@id, @prefix)';

    const prefix = interaction.options.getString('prefix');

    if (!prefix) {
      return interaction.reply({
        embeds: [{
          title: 'Prefix',
          description: `The current prefix is \`${database?.prefix ?? client.config.prefix}\``,
          color: client.config.color
        }]
      });
    }

    if (prefix.length >= 10 || detector.test(prefix)) {
      return interaction.reply({
        embeds: [{
          title: 'Invalid Prefix',
          description: 'It must be shorter than 10 characters and it can\'t contain the bad letter',
          color: client.config.color
        }],
        ephemeral: true
      });
    }

    const newPrefix = prefix === client.config.prefix ? null : prefix;
    client.db.prepare(statement).run({ id: interaction.guildId, prefix: newPrefix });
    interaction.reply({
      embeds: [{
        title: 'Prefix',
        description: `Chanqed prefix to \`${prefix}\``,
        color: client.config.color
      }]
    });
  },

  data: new SlashCommandBuilder()
    .setName('prefix')
    .setDescription('Manaqe the bot\'s prefix')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .setDMPermission(false)
    .addStringOption(option => option
      .setName('prefix')
      .setDescription('The new prefix to set')
      .setRequired(false)
    )
};
