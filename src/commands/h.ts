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
              url: 'https://cdn.discordapp.com/attachments/439531641539526666/861256439209394176/arg-h-trans.gif'
            }
          }
        ]
      }
    ]
  });
}

export const chatInputCommandData = new ChatInputCommandBuilder()
  .setName('h')
  .setDescription('h')
  .setContexts([InteractionContextType.Guild, InteractionContextType.BotDM, InteractionContextType.PrivateChannel])
  .setIntegrationTypes([ApplicationIntegrationType.GuildInstall, ApplicationIntegrationType.UserInstall])
  .toJSON();
