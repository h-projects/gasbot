import dedent from 'dedent';
import {
  ApplicationIntegrationType,
  ChatInputCommandBuilder,
  type ChatInputCommandInteraction,
  type ComponentInContainerData,
  ComponentType,
  InteractionContextType,
  MessageFlags,
  UserContextCommandBuilder,
  type UserContextMenuCommandInteraction
} from 'discord.js';
import type { Application } from '#classes';

export async function onCommand(
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

  const { count: globalCount } = await client.prisma.global.findFirstOrThrow({
    select: { count: true }
  });

  const { count: userCount } = await client.prisma.user.upsert({
    select: { count: true },
    where: {
      id: BigInt(user.id)
    },
    create: {
      id: BigInt(user.id)
    },
    update: {}
  });

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
    const { count: guildCount } = await client.prisma.guild.upsert({
      select: { count: true },
      where: {
        id: BigInt(interaction.guildId)
      },
      create: {
        id: BigInt(interaction.guildId)
      },
      update: {}
    });

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
