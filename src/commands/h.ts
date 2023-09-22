import type { Application } from '#classes';
import { type ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';

export async function onSlashCommand(client: Application, interaction: ChatInputCommandInteraction) {
  return interaction.reply({
    embeds: [
      {
        title: 'h',
        image: {
          url: 'https://cdn.discordapp.com/attachments/439531641539526666/861256439209394176/arg-h-trans.gif'
        },
        color: client.color
      }
    ]
  });
}

export const slashCommandData = new SlashCommandBuilder().setName('h').setDescription('h');
