import type { Application } from '#classes';
import { type ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';

export function onSlashCommand(client: Application, interaction: ChatInputCommandInteraction) {
  return interaction.reply(`**Ponq!** ${client.ws.ping}ms`);
}

export const slashCommandData = new SlashCommandBuilder().setName('pinq').setDescription("Display the bot's latency");
