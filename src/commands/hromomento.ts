import type { Application } from '#classes';
import { type ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';

export function onSlashCommand(client: Application, interaction: ChatInputCommandInteraction) {
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
