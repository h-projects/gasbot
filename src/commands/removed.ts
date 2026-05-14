import { ChatInputCommandBuilder, UserContextCommandBuilder } from '@discordjs/builders';
import dedent from 'dedent';
import {
  ApplicationIntegrationType,
  type ChatInputCommandInteraction,
  type ComponentInContainerData,
  ComponentType,
  InteractionContextType,
  MessageFlags,
  type UserContextMenuCommandInteraction
} from 'discord.js';
import type { Application } from '#classes';
import { database } from '#database';

const globalCountStatement = database.prepare('SELECT count FROM global');
const guildCountStatement = database.prepare('SELECT count FROM guilds WHERE id = ?');
const userCountStatement = database.prepare('SELECT count FROM users WHERE id = ?');

export function onCommand(
  client: Application,
  interaction: ChatInputCommandInteraction | UserContextMenuCommandInteraction
) {
  const user = interaction.options.getUser('user') ?? interaction.user;
  if (user.bot) {
    return interaction.reply({
      content: "You can't mention a bot 😦",
      flags: MessageFlags.Ephemeral
    });
  }

  const globalCount = globalCountStatement.get()?.count as bigint;
  const userCount = userCountStatement.get(BigInt(user.id))?.count as bigint | null;

  const components: ComponentInContainerData[] = [
    {
      type: ComponentType.TextDisplay,
      content: dedent`
        # Bad Letters Removed
        Removed ${globalCount} bad letters in total
      `
    },
    { type: ComponentType.Separator },
    {
      type: ComponentType.TextDisplay,
      content: dedent`
        ### User Stats
        Removed ${userCount ?? 0} bad letters from ${user.toString()}
      `
    }
  ];

  if (interaction.inGuild()) {
    const guildCount = guildCountStatement.get(BigInt(interaction.guildId))?.count as bigint | null;

    components.push(
      { type: ComponentType.Separator },
      {
        type: ComponentType.TextDisplay,
        content: dedent`
          ### Server Stats
          Removed ${guildCount ?? 0} bad letters in this server
        `
      }
    );
  }

  return interaction.reply({
    flags: MessageFlags.IsComponentsV2,
    components: [{ type: ComponentType.Container, accentColor: client.color, components }],
    allowedMentions: { parse: [] }
  });
}

export const chatInputCommandData = new ChatInputCommandBuilder()
  .setName('removed')
  .setDescription('Check how many bad letters were removed')
  .setContexts([InteractionContextType.Guild, InteractionContextType.BotDM, InteractionContextType.PrivateChannel])
  .setIntegrationTypes([ApplicationIntegrationType.GuildInstall, ApplicationIntegrationType.UserInstall])
  .addUserOptions(option => option.setName('user').setDescription('User to check').setRequired(false))
  .toJSON();

export const contextMenuCommandData = new UserContextCommandBuilder()
  .setName('Removed Count')
  .setContexts([InteractionContextType.Guild, InteractionContextType.BotDM, InteractionContextType.PrivateChannel])
  .setIntegrationTypes([ApplicationIntegrationType.GuildInstall, ApplicationIntegrationType.UserInstall])
  .toJSON();
