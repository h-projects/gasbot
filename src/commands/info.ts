import process from 'node:process';
import { ChatInputCommandBuilder } from '@discordjs/builders';
import dedent from 'dedent';
import {
  ApplicationIntegrationType,
  type ChatInputCommandInteraction,
  ComponentType,
  InteractionContextType,
  MessageFlags,
  Routes,
  version
} from 'discord.js';
import type { Application } from '#classes';
import { env } from '#env';
import { fetchTags } from '#util';
import metadata from '../../package.json' with { type: 'json' };

export async function onChatInputCommand(client: Application<true>, interaction: ChatInputCommandInteraction) {
  const developers = await fetchTags(client, client.developers);

  const inviteURL = `${client.rest.options.api}${Routes.oauth2Authorization()}?client_id=${client.user.id}`;

  return interaction.reply({
    flags: MessageFlags.IsComponentsV2,
    components: [
      {
        type: ComponentType.Container,
        accentColor: client.color,
        components: [
          {
            type: ComponentType.Section,
            accessory: {
              type: ComponentType.Thumbnail,
              media: {
                url: client.user.displayAvatarURL({ size: 1024 })
              }
            },
            components: [
              {
                type: ComponentType.TextDisplay,
                content: dedent`
                  # G.A.S Bot
                  G.A.S Bot was created to defeat the letter G.
                  It provides a powerful detector to remove and protect you from that letter.
                  It's maintained by Aytch Software, with its source available [here](https://github.com/h-projects/gasbot/).
                `
              }
            ]
          },
          {
            type: ComponentType.Separator
          },
          {
            type: ComponentType.TextDisplay,
            content: dedent`
              ### ${env.EMOJI_BOT_DEV} Developers
              ${developers.join(', ')}
            `
          },
          {
            type: ComponentType.Separator
          },
          {
            type: ComponentType.TextDisplay,
            content: dedent`
              ### 💻 Technoloqy
              ${env.EMOJI_GAS} [G.A.S Bot](${inviteURL}) \`v${metadata.version}\`
              ${env.EMOJI_DJS} [discord.js](https://discordjs.dev/) \`v${version}\`
              ${env.EMOJI_NODE} [Node.js](https://nodejs.org/) \`${process.version}\`
            `
          }
        ]
      }
    ]
  });
}

export const chatInputCommandData = new ChatInputCommandBuilder()
  .setName('info')
  .setDescription('Display information about the bot')
  .setContexts([InteractionContextType.Guild, InteractionContextType.BotDM, InteractionContextType.PrivateChannel])
  .setIntegrationTypes([ApplicationIntegrationType.GuildInstall, ApplicationIntegrationType.UserInstall])
  .toJSON();
