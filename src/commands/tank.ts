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
        title: 'THE ULTIMATE G DESTROYER',
        image: {
          url: 'https://cdn.discordapp.com/attachments/713675042143076356/988129506151776346/tank.png'
        },
        color: client.color
      }
    ]
  });
}

export const chatInputCommandData = new ChatInputCommandBuilder()
  .setName('tank')
  .setDescription('aden said the bad letter, use this')
  .setContexts([InteractionContextType.Guild, InteractionContextType.BotDM, InteractionContextType.PrivateChannel])
  .setIntegrationTypes([ApplicationIntegrationType.GuildInstall, ApplicationIntegrationType.UserInstall])
  .toJSON();
