import type { Application } from '#classes';
import { SlashCommandBuilder } from '@discordjs/builders';
import type { ChatInputCommandInteraction } from 'discord.js';

export async function onSlashCommand(client: Application, interaction: ChatInputCommandInteraction) {
  return interaction.reply(`**Ponq!** ${client.ws.ping}ms`);
}

export const slashCommandData = new SlashCommandBuilder().setName('pinq').setDescription("Display the bot's latency");
