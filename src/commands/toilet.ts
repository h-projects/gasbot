import type { Application } from '#classes';
import { SlashCommandBuilder } from '@discordjs/builders';
import type { ChatInputCommandInteraction } from 'discord.js';

export async function onSlashCommand(client: Application, interaction: ChatInputCommandInteraction) {
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

export const slashCommandData = new SlashCommandBuilder().setName('toilet').setDescription('polish toilet');
