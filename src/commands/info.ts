import process from 'node:process';
import type { Application } from '#classes';
import { env } from '#env';
import { fetchTags } from '#util';
import dedent from 'dedent';
import { type ChatInputCommandInteraction, OAuth2Scopes, SlashCommandBuilder, version } from 'discord.js';

export async function onSlashCommand(client: Application<true>, interaction: ChatInputCommandInteraction) {
  const developers = await fetchTags(client, client.developers);
  client.application.installParams ?? (await client.application.fetch());
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
            name: '<:VerifiedBotDev:764412852395180032> Developers',
            value: developers.join('\n'),
            inline: true
          },
          {
            name: '💻 Technoloqy',
            value: dedent`
              <:gas:896370532751147028> [G.A.S Bot](${client.generateInvite(
                client.application.installParams ?? { scopes: [OAuth2Scopes.Bot] }
              )}) \`v${env.npm_package_version}\`
              <:djs:893948932651118653> [discord.js](https://discordjs.dev/) \`v${version}\`
              <:node:893952060205178941> [Node.js](https://nodejs.org/) \`${process.version}\`
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
  .setDescription('Display information about the bot');
