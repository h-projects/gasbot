import type { Application } from '#classes';
import { type ChatInputCommandInteraction, Routes, SlashCommandBuilder } from 'discord.js';

export async function onSlashCommand(client: Application<true>, interaction: ChatInputCommandInteraction) {
  const guildId = interaction.options.getString('guild', true);
  const create = interaction.options.getBoolean('create') ?? true;

  try {
    await client.rest.put(Routes.applicationGuildCommands(client.user.id, guildId), {
      body: create
        ? [
            ...client.chatInputCommands.filter(c => c.dev).map(c => c.slashCommandData.toJSON()),
            ...client.contextMenuCommands.filter(c => c.dev).map(c => c.contextMenuCommandData.toJSON())
          ]
        : []
    });

    return interaction.reply({
      content: `${create ? 'Deployed' : 'Deleted'} dev commands in \`${guildId}\``,
      ephemeral: true
    });
  } catch (error: unknown) {
    return interaction.reply({
      embeds: [
        {
          title: 'lol you messed up',
          description: `\`\`\`js\n${error}\`\`\``,
          color: client.color
        }
      ],
      ephemeral: true
    });
  }
}

export const dev = true;

export const slashCommandData = new SlashCommandBuilder()
  .setName('deploy-dev')
  .setDescription('Deploy dev commands to a guild')
  .addStringOption(option => option.setName('guild').setDescription('The guild ID').setRequired(true))
  .addBooleanOption(option =>
    option.setName('create').setDescription('Whether to create the command (false to delete)').setRequired(false)
  );
