import type { Application } from '#classes';
import { fetchTags } from '#util';
import {
  ApplicationIntegrationType,
  type ChatInputCommandInteraction,
  InteractionContextType,
  SlashCommandBuilder
} from 'discord.js';

export async function onSlashCommand(client: Application, interaction: ChatInputCommandInteraction) {
  const developers = await fetchTags(client, client.developers);
  const specialThanksUsers = await fetchTags(client, client.specialThanksUsers);

  return interaction.reply({
    embeds: [
      {
        title: 'Credits',
        fields: [
          { name: '<:VerifiedBotDev:764412852395180032> Developers', value: developers.join('\n'), inline: true },
          { name: '⭐ Special Thanks', value: specialThanksUsers.join('\n'), inline: true }
        ],
        color: client.color
      }
    ]
  });
}

export const slashCommandData = new SlashCommandBuilder()
  .setName('credits')
  .setDescription('People who helped in the development')
  .setContexts([InteractionContextType.Guild, InteractionContextType.BotDM, InteractionContextType.PrivateChannel])
  .setIntegrationTypes([ApplicationIntegrationType.GuildInstall, ApplicationIntegrationType.UserInstall]);
