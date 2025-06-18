import {
  ApplicationIntegrationType,
  type ChatInputCommandInteraction,
  InteractionContextType,
  SlashCommandBuilder
} from 'discord.js';
import type { Application } from '#classes';

export function onSlashCommand(client: Application, interaction: ChatInputCommandInteraction) {
  return interaction.reply(`**Ponq!** ${client.ws.ping}ms`);
}

export const slashCommandData = new SlashCommandBuilder()
  .setName('pinq')
  .setDescription("Display the bot's latency")
  .setContexts([InteractionContextType.Guild, InteractionContextType.BotDM, InteractionContextType.PrivateChannel])
  .setIntegrationTypes([ApplicationIntegrationType.GuildInstall, ApplicationIntegrationType.UserInstall]);
