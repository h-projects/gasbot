import {
  ActionRowBuilder,
  ApplicationIntegrationType,
  ButtonBuilder,
  type ButtonInteraction,
  ButtonStyle,
  ChannelSelectMenuBuilder,
  type ChannelSelectMenuInteraction,
  ChannelType,
  type ChatInputCommandInteraction,
  InteractionContextType,
  PermissionFlagsBits,
  SlashCommandBuilder
} from 'discord.js';
import type { Application } from '#classes';

const getRows = ({ channelId, disabled, userId }: { channelId?: string; disabled: boolean; userId: string }) => [
  new ActionRowBuilder<ChannelSelectMenuBuilder>().addComponents([
    new ChannelSelectMenuBuilder()
      .setChannelTypes(ChannelType.GuildText, ChannelType.GuildAnnouncement)
      .setDefaultChannels(channelId ? [channelId] : [])
      .setCustomId(`logs:set:${userId}`)
      .setPlaceholder('Set loqs channel')
  ]),
  new ActionRowBuilder<ButtonBuilder>().addComponents([
    new ButtonBuilder()
      .setLabel('Reset')
      .setStyle(ButtonStyle.Secondary)
      .setCustomId(`logs:reset:${userId}`)
      .setDisabled(disabled)
  ])
];

export async function onSlashCommand(client: Application, interaction: ChatInputCommandInteraction<'cached'>) {
  const channel = interaction.options.getChannel('channel');

  if (!channel) {
    const { logs: logsId } = await client.prisma.guild.upsert({
      select: { logs: true },
      where: {
        id: BigInt(interaction.guildId)
      },
      create: {
        id: BigInt(interaction.guildId)
      },
      update: {}
    });

    const logs = interaction.guild.channels.cache.get(logsId?.toString() ?? '');
    return interaction.reply({
      embeds: [
        {
          title: 'Loqs',
          description: logs ? `The current loqs channel is ${logs}` : "You don't have a loqs channel set up!",
          color: client.color
        }
      ],
      components: getRows({
        userId: interaction.user.id,
        channelId: logs?.id,
        disabled: !logs
      })
    });
  }

  await client.prisma.guild.upsert({
    where: {
      id: BigInt(interaction.guildId)
    },
    create: {
      id: BigInt(interaction.guildId),
      logs: BigInt(channel.id)
    },
    update: {
      logs: BigInt(channel.id)
    }
  });

  return interaction.reply({
    embeds: [
      {
        title: 'Loqs',
        description: `The loqs channel is now ${channel}`,
        color: client.color
      }
    ],
    components: getRows({
      userId: interaction.user.id,
      channelId: channel.id,
      disabled: false
    })
  });
}

export async function onComponent(
  client: Application,
  interaction: ButtonInteraction<'cached'> | ChannelSelectMenuInteraction<'cached'>
) {
  const setModeEnabled = interaction.isChannelSelectMenu();
  await client.prisma.guild.update({
    where: {
      id: BigInt(interaction.guildId)
    },
    data: {
      logs: setModeEnabled ? BigInt(interaction.values[0]) : null
    }
  });

  return interaction.update({
    embeds: [
      {
        title: 'Loqs',
        description: setModeEnabled
          ? `The loqs channel is now <#${interaction.values[0]}>`
          : 'Successfully reset the loqs channel',
        color: client.color
      }
    ],
    components: getRows({
      userId: interaction.user.id,
      channelId: setModeEnabled ? interaction.values[0] : undefined,
      disabled: !setModeEnabled
    })
  });
}

export const hasComponent = true;

export const slashCommandData = new SlashCommandBuilder()
  .setName('loqs')
  .setDescription('Manaqe the loqs channel')
  .setContexts([InteractionContextType.Guild])
  .setIntegrationTypes([ApplicationIntegrationType.GuildInstall])
  .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
  .addChannelOption(option =>
    option
      .setName('channel')
      .setDescription('Set loqs channel')
      .addChannelTypes(ChannelType.GuildText, ChannelType.GuildAnnouncement)
      .setRequired(false)
  );
