import type { Application } from '#classes';
import { env } from '#env';
import { SlashCommandBuilder } from '@discordjs/builders';
import { type ChatInputCommandInteraction, OAuth2Scopes } from 'discord.js';

export async function onSlashCommand(client: Application<true>, interaction: ChatInputCommandInteraction) {
  const nog = '<:nog:676105350306594819>';
  const gas = '<:gas:896370532751147028>';
  const aytchSoftware = '<:AytchSoftware:720949593696894996>';

  client.application.installParams ?? (await client.application.fetch());

  return interaction.reply({
    embeds: [
      {
        title: 'Links',
        fields: [
          {
            name: `Want to remove ${nog} in your server?`,
            value: `${gas} Invite the bot [here](${client.generateInvite(
              client.application.installParams ?? { scopes: [OAuth2Scopes.Bot] }
            )})`
          },
          {
            name: 'Want to support the bot?',
            value: `⬆️ Upvote it [here](https://top.gg/bot/${client.user.id}/vote)`
          },
          {
            name: 'Need help?',
            value: `${aytchSoftware} Join the Support Server [here](${env.SUPPORT_INVITE})`
          },
          {
            name: `Do you hate ${nog}?`,
            value: `${nog} Join the G Annihilation Squad [here](${env.GAS_INVITE})`
          }
        ],
        color: client.color
      }
    ]
  });
}

export const slashCommandData = new SlashCommandBuilder().setName('links').setDescription('Useful bot links');
