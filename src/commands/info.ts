import process from 'node:process';
import dedent from 'dedent';
import {
  ApplicationIntegrationType,
  type ChatInputCommandInteraction,
  DefaultRestOptions,
  InteractionContextType,
  Routes,
  SlashCommandBuilder,
  version
} from 'discord.js';
import type { Application } from '#classes';
import { env } from '#env';
import { fetchTags } from '#util';
import metadata from '../../package.json' with { type: 'json' };

export async function onSlashCommand(client: Application<true>, interaction: ChatInputCommandInteraction) {
  const developers = await fetchTags(client, client.developers);

  const inviteURL = `${DefaultRestOptions.api}${Routes.oauth2Authorization()}?client_id=${client.user.id}`;

  return interaction.reply({
    embeds: [
      {
        title: 'Info',
        color: client.color,
        fields: [
          {
            name: 'G.A.S Bot',
            value: 'G.A.S Bot was created to defeat the letter G.'
          },
          {
            name: 'G Removal',
            value: 'By default, it removes standalone G, and it can be chanqed to three different detection levels'
          },
          {
            name: `${env.EMOJI_BOT_DEV} Developers`,
            value: developers.join('\n'),
            inline: true
          },
          {
            name: '💻 Technoloqy',
            value: dedent`
              ${env.EMOJI_GAS} [G.A.S Bot](${inviteURL}) \`v${metadata.version}\`
              ${env.EMOJI_DJS} [discord.js](https://discordjs.dev/) \`v${version}\`
              ${env.EMOJI_NODE} [Node.js](https://nodejs.org/) \`${process.version}\`
            `,
            inline: true
          }
        ],
        thumbnail: {
          url: client.user.displayAvatarURL()
        }
      }
    ]
  });
}

export const slashCommandData = new SlashCommandBuilder()
  .setName('info')
  .setDescription('Display information about the bot')
  .setContexts([InteractionContextType.Guild, InteractionContextType.BotDM, InteractionContextType.PrivateChannel])
  .setIntegrationTypes([ApplicationIntegrationType.GuildInstall, ApplicationIntegrationType.UserInstall]);
