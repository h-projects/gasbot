import {
  ChatInputCommandBuilder,
  type ChatInputCommandInteraction,
  ComponentType,
  MessageFlags,
  Routes
} from 'discord.js';
import type { Application } from '#classes';

export async function onChatInputCommand(client: Application<true>, interaction: ChatInputCommandInteraction) {
  const guildId = interaction.options.getString('guild', true);
  const create = interaction.options.getBoolean('create') ?? true;

  try {
    await client.rest.put(Routes.applicationGuildCommands(client.user.id, guildId), {
      body: create
        ? [
            ...client.chatInputCommands.filter(c => c.dev).map(c => c.chatInputCommandData),
            ...client.contextMenuCommands.filter(c => c.dev).map(c => c.contextMenuCommandData)
          ]
        : []
    });

    return interaction.reply({
      content: `${create ? 'Deployed' : 'Deleted'} dev commands in \`${guildId}\``,
      flags: MessageFlags.Ephemeral
    });
  } catch (error) {
    return interaction.reply({
      flags: MessageFlags.Ephemeral | MessageFlags.IsComponentsV2,
      components: [
        {
          type: ComponentType.Container,
          accentColor: client.color,
          components: [
            {
              type: ComponentType.TextDisplay,
              content: `## Error Deploying\n\`\`\`js\n${error}\`\`\``
            }
          ]
        }
      ]
    });
  }
}

export const dev = true;

export const chatInputCommandData = new ChatInputCommandBuilder()
  .setName('deploy-dev')
  .setDescription('Deploy dev commands to a guild')
  .addStringOptions(option => option.setName('guild').setDescription('The guild ID').setRequired(true))
  .addBooleanOptions(option =>
    option.setName('create').setDescription('Whether to create the command (false to delete)').setRequired(false)
  )
  .toJSON();
