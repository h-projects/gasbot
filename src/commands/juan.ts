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
              url: 'https://cdn.discordapp.com/attachments/729730142125031505/768799803009269771/hYrZ6QK.png'
            }
          }
        ]
      }
    ]
  });
}

export const chatInputCommandData = new ChatInputCommandBuilder()
  .setName('juan')
  .setDescription('🐴')
  .setContexts([InteractionContextType.Guild, InteractionContextType.BotDM, InteractionContextType.PrivateChannel])
  .setIntegrationTypes([ApplicationIntegrationType.GuildInstall, ApplicationIntegrationType.UserInstall])
  .toJSON();
