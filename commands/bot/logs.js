const { SlashCommandBuilder } = require('@discordjs/builders');
const { ChannelType, PermissionFlagsBits } = require('discord-api-types/v10');

module.exports = {
  async execute(client, interaction) {
    const database = client.db.prepare('SELECT logs FROM guilds WHERE id = ?').get(interaction.guildId);
    const statement = database ? 'UPDATE guilds SET logs = @logs WHERE id = @id' : 'INSERT INTO guilds (id, logs) VALUES (@id, @logs)';

    const channel = interaction.options.getChannel('channel');

    if (!channel) {
      const logs = interaction.guild.channels.cache.get(database?.logs);
      return interaction.reply({
        embeds: [{
          title: 'Loqs',
          description: logs ? `The current loqs channel is ${logs}` : 'You don\'t have a loqs channel set up!',
          color: client.config.color
        }],
        components: logs ? [{
          type: 'ACTION_ROW',
          components: [{
            type: 'BUTTON',
            style: 'SECONDARY',
            label: 'Reset',
            customId: `loqs::${interaction.user.id}`
          }]
        }] : null
      });
    }

    client.db.prepare(statement).run({ id: interaction.guildId, logs: channel.id });
    return interaction.reply({
      embeds: [{
        title: 'Loqs',
        description: `The loqs channel is now ${channel}`,
        color: client.config.color
      }],
      components: [{
        type: 'ACTION_ROW',
        components: [{
          type: 'BUTTON',
          style: 'SECONDARY',
          label: 'Reset',
          customId: `loqs::${interaction.user.id}`
        }]
      }]
    });
  },

  data: new SlashCommandBuilder()
    .setName('loqs')
    .setDescription('Manaqe the loqs channel')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
    .setDMPermission(false)
    .addChannelOption(option => option
      .setName('channel')
      .setDescription('Set loqs channel')
      .addChannelTypes(ChannelType.GuildText, ChannelType.GuildNews)
      .setRequired(false)
    )
};
