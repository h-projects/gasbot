import type { Application } from '#classes';
import { SlashCommandBuilder } from '@discordjs/builders';
import type { ChatInputCommandInteraction } from 'discord.js';

export async function onSlashCommand(client: Application, interaction: ChatInputCommandInteraction) {
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

export const slashCommandData = new SlashCommandBuilder()
  .setName('tank')
  .setDescription('aden said the bad letter, use this');
