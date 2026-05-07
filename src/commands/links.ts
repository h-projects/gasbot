import dedent from 'dedent';
import {
  ApplicationIntegrationType,
  ChatInputCommandBuilder,
  type ChatInputCommandInteraction,
  ComponentType,
  DefaultRestOptions,
  InteractionContextType,
  MessageFlags,
  Routes
} from 'discord.js';
import type { Application } from '#classes';
import { env } from '#env';

export function onChatInputCommand(client: Application<true>, interaction: ChatInputCommandInteraction) {
  const inviteURL = `${DefaultRestOptions.api}${Routes.oauth2Authorization()}?client_id=${client.user.id}`;

  return interaction.reply({
    flags: MessageFlags.IsComponentsV2,
    components: [
      {
        type: ComponentType.Container,
        accentColor: client.color,
        components: [
          {
            type: ComponentType.TextDisplay,
            content: '# Links'
          },
          {
            type: ComponentType.Separator
          },
          {
            type: ComponentType.TextDisplay,
            content: dedent`
              ### Want to remove ${env.EMOJI_NOG} in your server?
              ${env.EMOJI_GAS} Invite the bot [here](${inviteURL})
            `
          },
          {
            type: ComponentType.Separator
          },
          {
            type: ComponentType.TextDisplay,
            content: dedent`
              ### Want to support the bot?
              ⬆️ Upvote it [here](https://top.gg/bot/${client.user.id}/vote)
            `
          },
          {
            type: ComponentType.Separator
          },
          {
            type: ComponentType.TextDisplay,
            content: dedent`
              ### Need help?
              ${env.EMOJI_AYTCH_SOFTWARE} Join the [Support Server](${env.SUPPORT_INVITE})
            `
          },
          {
            type: ComponentType.Separator
          },
          {
            type: ComponentType.TextDisplay,
            content: dedent`
              ### Do you hate ${env.EMOJI_NOG}?
              ${env.EMOJI_NOG} Join the [G Annihilation Squad](${env.GAS_INVITE})
            `
          }
        ]
      }
    ]
  });
}

export const chatInputCommandData = new ChatInputCommandBuilder()
  .setName('links')
  .setDescription('Useful bot links')
  .setContexts([InteractionContextType.Guild, InteractionContextType.BotDM, InteractionContextType.PrivateChannel])
  .setIntegrationTypes([ApplicationIntegrationType.GuildInstall, ApplicationIntegrationType.UserInstall])
  .toJSON();
