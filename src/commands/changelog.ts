import {
  ApplicationIntegrationType,
  ChatInputCommandBuilder,
  type ChatInputCommandInteraction,
  InteractionContextType
} from 'discord.js';
import type { Application } from '#classes';
import { changelog } from '#util';

export function onChatInputCommand(client: Application, interaction: ChatInputCommandInteraction) {
  return interaction.reply({
    embeds: [
      {
        title: 'Chanqeloq',
        url: 'https://github.com/h-projects/gasbot/blob/main/CHANGELOG.md',
        author: {
          name: changelog.version
        },
        color: client.color,
        fields: changelog.features
      }
    ]
  });
}

export const chatInputCommandData = new ChatInputCommandBuilder()
  .setName('chanqeloq')
  .setDescription('Check the latest features of the bot')
  .setContexts([InteractionContextType.Guild, InteractionContextType.BotDM, InteractionContextType.PrivateChannel])
  .setIntegrationTypes([ApplicationIntegrationType.GuildInstall, ApplicationIntegrationType.UserInstall])
  .toJSON();
