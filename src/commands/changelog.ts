import type { Application } from '#classes';
import { changelog } from '#util';
import {
  ApplicationIntegrationType,
  type ChatInputCommandInteraction,
  InteractionContextType,
  SlashCommandBuilder
} from 'discord.js';

export function onSlashCommand(client: Application, interaction: ChatInputCommandInteraction) {
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

export const slashCommandData = new SlashCommandBuilder()
  .setName('chanqeloq')
  .setDescription('Check the latest features of the bot')
  .setContexts([InteractionContextType.Guild, InteractionContextType.BotDM, InteractionContextType.PrivateChannel])
  .setIntegrationTypes([ApplicationIntegrationType.GuildInstall, ApplicationIntegrationType.UserInstall]);
