import {
  ApplicationIntegrationType,
  ChatInputCommandBuilder,
  type ChatInputCommandInteraction,
  ComponentType,
  InteractionContextType,
  MessageFlags
} from 'discord.js';
import type { Application } from '#classes';
import { env } from '#env';
import { fetchTags } from '#util';

export async function onChatInputCommand(client: Application, interaction: ChatInputCommandInteraction) {
  const developers = await fetchTags(client, client.developers);
  const specialThanksUsers = await fetchTags(client, client.specialThanksUsers);

  return interaction.reply({
    flags: MessageFlags.IsComponentsV2,
    components: [
      {
        type: ComponentType.Container,
        accentColor: client.color,
        components: [
          {
            type: ComponentType.TextDisplay,
            content: '# Credits'
          },
          {
            type: ComponentType.Separator
          },
          {
            type: ComponentType.TextDisplay,
            content: `### ${env.EMOJI_BOT_DEV} Developers\n${developers.join(', ')}`
          },
          {
            type: ComponentType.Separator
          },
          {
            type: ComponentType.TextDisplay,
            content: `### ⭐ Special Thanks\n${specialThanksUsers.join(', ')}`
          }
        ]
      }
    ]
  });
}

export const chatInputCommandData = new ChatInputCommandBuilder()
  .setName('credits')
  .setDescription('People who helped in the development')
  .setContexts([InteractionContextType.Guild, InteractionContextType.BotDM, InteractionContextType.PrivateChannel])
  .setIntegrationTypes([ApplicationIntegrationType.GuildInstall, ApplicationIntegrationType.UserInstall])
  .toJSON();
