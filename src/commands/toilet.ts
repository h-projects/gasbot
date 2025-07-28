import {
  ApplicationIntegrationType,
  ChatInputCommandBuilder,
  type ChatInputCommandInteraction,
  InteractionContextType
} from 'discord.js';
import type { Application } from '#classes';

export function onChatInputCommand(client: Application, interaction: ChatInputCommandInteraction) {
  return interaction.reply({
    embeds: [
      {
        title: 'polish toilet',
        image: {
          url: 'https://c.tenor.com/4vgPhxKQw_MAAAAS/polish-toilet.gif'
        },
        color: client.color
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
