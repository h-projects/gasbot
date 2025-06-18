import {
  type APIEmbedField,
  ApplicationCommandType,
  ApplicationIntegrationType,
  type ChatInputCommandInteraction,
  ContextMenuCommandBuilder,
  InteractionContextType,
  SlashCommandBuilder,
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
      ephemeral: true
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

export const slashCommandData = new SlashCommandBuilder()
  .setName('removed')
  .setDescription('Check how many bad letters were removed')
  .setContexts([InteractionContextType.Guild, InteractionContextType.BotDM, InteractionContextType.PrivateChannel])
  .setIntegrationTypes([ApplicationIntegrationType.GuildInstall, ApplicationIntegrationType.UserInstall])
  .addUserOption(option => option.setName('user').setDescription('User to check').setRequired(false));

export const contextMenuCommandData = new ContextMenuCommandBuilder()
  .setName('Removed Count')
  .setType(ApplicationCommandType.User)
  .setContexts([InteractionContextType.Guild, InteractionContextType.BotDM, InteractionContextType.PrivateChannel])
  .setIntegrationTypes([ApplicationIntegrationType.GuildInstall, ApplicationIntegrationType.UserInstall]);
