import {
  ApplicationIntegrationType,
  ChatInputCommandBuilder,
  type ChatInputCommandInteraction,
  InteractionContextType
} from 'discord.js';
import type { Application } from '#classes';
import { env } from '#env';
import { fetchTags } from '#util';

export async function onChatInputCommand(client: Application, interaction: ChatInputCommandInteraction) {
  const developers = await fetchTags(client, client.developers);
  const specialThanksUsers = await fetchTags(client, client.specialThanksUsers);

  return interaction.reply({
    embeds: [
      {
        title: 'Credits',
        fields: [
          { name: `${env.EMOJI_BOT_DEV} Developers`, value: developers.join('\n'), inline: true },
          { name: '⭐ Special Thanks', value: specialThanksUsers.join('\n'), inline: true }
        ],
        color: client.color
      }
    ]
  });
}

export const chatInputCommandData = new ChatInputCommandBuilder()
  .setName('credits')
  .setDescription('People who helped in the development')
  .setContexts([InteractionContextType.Guild, InteractionContextType.BotDM, InteractionContextType.PrivateChannel])
  .setIntegrationTypes([ApplicationIntegrationType.GuildInstall, ApplicationIntegrationType.UserInstall])
  .toJSON();
