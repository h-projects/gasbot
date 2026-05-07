import { ChatInputCommandBuilder } from '@discordjs/builders';
import {
  ApplicationIntegrationType,
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
              url: 'https://c.tenor.com/4vgPhxKQw_MAAAAS/polish-toilet.gif'
            }
          }
        ]
      }
    ]
  });
}

export const chatInputCommandData = new ChatInputCommandBuilder()
  .setName('toilet')
  .setDescription('polish toilet')
  .setContexts([InteractionContextType.Guild, InteractionContextType.BotDM, InteractionContextType.PrivateChannel])
  .setIntegrationTypes([ApplicationIntegrationType.GuildInstall, ApplicationIntegrationType.UserInstall])
  .toJSON();
