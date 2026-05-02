import {
  ApplicationIntegrationType,
  ChatInputCommandBuilder,
  type ChatInputCommandInteraction,
  ComponentType,
  InteractionContextType,
  MessageFlags
} from 'discord.js';
import type { Application } from '#classes';

export function onChatInputCommand(_client: Application, interaction: ChatInputCommandInteraction) {
  return interaction.reply({
    flags: MessageFlags.IsComponentsV2,
    components: [
      {
        type: ComponentType.MediaGallery,
        items: [
          {
            media: {
              url: 'https://cdn.discordapp.com/emojis/805862278766395483.webp'
            }
          }
        ]
      }
    ]
  });
}

export const chatInputCommandData = new ChatInputCommandBuilder()
  .setName('huh')
  .setDescription(':thinkinq_h:')
  .setContexts([InteractionContextType.Guild, InteractionContextType.BotDM, InteractionContextType.PrivateChannel])
  .setIntegrationTypes([ApplicationIntegrationType.GuildInstall, ApplicationIntegrationType.UserInstall])
  .toJSON();
