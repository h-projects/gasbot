import type { Application } from '#classes';
import { SlashCommandBuilder } from '@discordjs/builders';
import type { ChatInputCommandInteraction } from 'discord.js';

export async function onSlashCommand(client: Application, interaction: ChatInputCommandInteraction) {
  return interaction.reply({
    embeds: [
      {
        title: 'hro momento',
        image: {
          url: 'https://c.tenor.com/jChba0HF5jcAAAAM/brro-momento.gif'
        },
        color: client.color
      }
    ]
  });
}

export const slashCommandData = new SlashCommandBuilder()
  .setName('hromomento')
  .setDescription('aqui tenemos un qran bro momento');
