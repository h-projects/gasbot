import type { Application } from '#classes';
import { SlashCommandBuilder } from '@discordjs/builders';
import type { ChatInputCommandInteraction } from 'discord.js';

export async function onSlashCommand(client: Application, interaction: ChatInputCommandInteraction) {
  return interaction.reply({
    embeds: [
      {
        title: 'Juan',
        image: {
          url: 'https://cdn.discordapp.com/attachments/729730142125031505/768799803009269771/hYrZ6QK.png'
        },
        color: client.color
      }
    ]
  });
}

export const slashCommandData = new SlashCommandBuilder().setName('juan').setDescription('🐴');
