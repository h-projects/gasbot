import {
  ApplicationIntegrationType,
  type ChatInputCommandInteraction,
  InteractionContextType,
  SlashCommandBuilder
} from 'discord.js';
import type { Application } from '#classes';

export function onSlashCommand(client: Application, interaction: ChatInputCommandInteraction) {
  return interaction.reply({
    embeds: [
      {
        title: 'huh',
        image: {
          url: 'https://cdn.discordapp.com/emojis/805862278766395483.png?size=4096&quality=lossless'
        },
        color: client.color
      }
    ]
  });
}

export const slashCommandData = new SlashCommandBuilder()
  .setName('huh')
  .setDescription(':thinkinq_h:')
  .setContexts([InteractionContextType.Guild, InteractionContextType.BotDM, InteractionContextType.PrivateChannel])
  .setIntegrationTypes([ApplicationIntegrationType.GuildInstall, ApplicationIntegrationType.UserInstall]);
