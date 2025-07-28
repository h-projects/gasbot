import {
  type APIEmbedField,
  ApplicationIntegrationType,
  ChatInputCommandBuilder,
  type ChatInputCommandInteraction,
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
      embeds: [
        {
          title: 'Invalid User',
          description: "You can't mention a bot 😦",
          color: client.color
        }
      ],
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

  const { count: guildCount } = interaction.inGuild()
    ? await client.prisma.guild.upsert({
        select: { count: true },
        where: {
          id: BigInt(interaction.guildId)
        },
        create: {
          id: BigInt(interaction.guildId)
        },
        update: {}
      })
    : {
        count: null
      };

  const fields: APIEmbedField[] = [{ name: 'User Stats', value: `Removed ${userCount ?? 0} bad letters from ${user}` }];

  if (guildCount !== null) {
    fields.push({ name: 'Server Stats', value: `Removed ${guildCount ?? 0} bad letters in this server` });
  }

  return interaction.reply({
    embeds: [
      {
        title: 'Bad Letters Removed',
        color: client.color,
        description: `Removed ${globalCount} bad letters in total`,
        fields
      }
    ]
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
