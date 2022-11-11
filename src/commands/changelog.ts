import type { Application } from '#classes';
import { changelog } from '#util';
import { SlashCommandBuilder } from '@discordjs/builders';
import type { ChatInputCommandInteraction } from 'discord.js';

export async function onSlashCommand(client: Application, interaction: ChatInputCommandInteraction) {
  return interaction.reply({
    embeds: [
      {
        title: 'Chanqeloq',
        url: 'https://github.com/h-projects/gasbot/blob/master/CHANGELOG.md',
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
  .setDescription('Check the latest features of the bot');
