import type { Application } from '#classes';
import { env } from '#env';
import {
  ApplicationIntegrationType,
  type ChatInputCommandInteraction,
  DefaultRestOptions,
  InteractionContextType,
  Routes,
  SlashCommandBuilder
} from 'discord.js';

export function onSlashCommand(client: Application<true>, interaction: ChatInputCommandInteraction) {
  const inviteURL = `${DefaultRestOptions.api}${Routes.oauth2Authorization()}?client_id=${client.user.id}`;

  return interaction.reply({
    embeds: [
      {
        title: 'Links',
        fields: [
          {
            name: `Want to remove ${env.EMOJI_NOG} in your server?`,
            value: `${env.EMOJI_GAS} Invite the bot [here](${inviteURL})`
          },
          {
            name: 'Want to support the bot?',
            value: `⬆️ Upvote it [here](https://top.gg/bot/${client.user.id}/vote)`
          },
          {
            name: 'Need help?',
            value: `${env.EMOJI_AYTCH_SOFTWARE} Join the Support Server [here](${env.SUPPORT_INVITE})`
          },
          {
            name: `Do you hate ${env.EMOJI_NOG}?`,
            value: `${env.EMOJI_NOG} Join the G Annihilation Squad [here](${env.GAS_INVITE})`
          }
        ],
        color: client.color
      }
    ]
  });
}

export const slashCommandData = new SlashCommandBuilder()
  .setName('links')
  .setDescription('Useful bot links')
  .setContexts([InteractionContextType.Guild, InteractionContextType.BotDM, InteractionContextType.PrivateChannel])
  .setIntegrationTypes([ApplicationIntegrationType.GuildInstall, ApplicationIntegrationType.UserInstall]);
