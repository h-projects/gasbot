const { SlashCommandBuilder } = require('@discordjs/builders');
const { Routes } = require('discord-api-types/v10');

module.exports = {
  async execute(client, interaction) {
    const commands = [];
    const guildId = interaction.options.getString('guild');
    const create = interaction.options.getBoolean('create') ?? true;

    client.commands.filter(c => c.category === 'dev').forEach(command => {
      commands.push(command.data.toJSON());

      if (command.contextData) {
        commands.push(command.contextData.toJSON());
      }
    });

    try {
      await client.restModule.put(Routes.applicationGuildCommands(client.user.id, guildId), {
        body: create ? commands : []
      });

      interaction.reply({
        content: `${create ? 'Deployed' : 'Deleted'} dev commands in \`${guildId}\``,
        ephemeral: true
      });
    } catch (error) {
      interaction.reply({
        embeds: [{
          title: 'lol you got a extremely rare error',
          description: `\`\`\`js\n${error}\`\`\``,
          color: client.config.color
        }],
        ephemeral: true
      });
    }
  },

  data: new SlashCommandBuilder()
    .setName('deploy-dev')
    .setDescription('Deploy dev commands to a guild')
    .addStringOption(option => option
      .setName('guild')
      .setDescription('The guild ID')
      .setRequired(true)
    )
    .addBooleanOption(option => option
      .setName('create')
      .setDescription('Whether to create the command (false to delete)')
      .setRequired(false)
    )
};
