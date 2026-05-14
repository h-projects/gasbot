import { ChatInputCommandBuilder } from '@discordjs/builders';
import {
  ApplicationIntegrationType,
  type ButtonInteraction,
  ButtonStyle,
  type ChannelSelectMenuComponentData,
  type ChannelSelectMenuInteraction,
  ChannelType,
  type ChatInputCommandInteraction,
  ComponentType,
  type ContainerComponentData,
  InteractionContextType,
  MessageFlags,
  PermissionFlagsBits,
  SelectMenuDefaultValueType
} from 'discord.js';
import type { Application } from '#classes';
import { database } from '#database';

const getComponents = ({
  channelId,
  color,
  content,
  disabled,
  userId
}: {
  channelId?: string;
  color: number;
  content: string;
  disabled: boolean;
  userId: string;
}): ContainerComponentData[] => [
  {
    type: ComponentType.Container,
    accentColor: color,
    components: [
      {
        type: ComponentType.TextDisplay,
        content: '# Loqs'
      },
      {
        type: ComponentType.Separator
      },
      {
        type: ComponentType.TextDisplay,
        content
      },
      {
        type: ComponentType.ActionRow,
        components: [
          {
            type: ComponentType.ChannelSelect,
            channelTypes: [ChannelType.GuildText, ChannelType.GuildAnnouncement],
            defaultValues: channelId ? [{ type: SelectMenuDefaultValueType.Channel, id: channelId }] : [],
            customId: `logs:set:${userId}`,
            placeholder: 'Set loqs channel'
          } as ChannelSelectMenuComponentData
        ]
      },
      {
        type: ComponentType.ActionRow,
        components: [
          {
            type: ComponentType.Button,
            style: ButtonStyle.Secondary,
            customId: `logs:reset:${userId}`,
            label: 'Reset',
            disabled
          }
        ]
      }
    ]
  }
];

const getLogsStatement = database.prepare('SELECT logs FROM guilds WHERE id = ?');
const setLogsStatement = database.prepare(`
  INSERT INTO guilds (id, logs) VALUES (@id, @logs) ON CONFLICT (id) DO
    UPDATE SET logs = excluded.logs
`);

export function onChatInputCommand(client: Application, interaction: ChatInputCommandInteraction<'cached'>) {
  const channel = interaction.options.getChannel('channel');

  if (!channel) {
    const logsId = getLogsStatement.get(BigInt(interaction.guildId))?.logs as bigint | null;
    const logs = interaction.guild.channels.cache.get(logsId?.toString() ?? '');

    return interaction.reply({
      flags: MessageFlags.IsComponentsV2,
      components: getComponents({
        content: logs ? `Currently set to ${logs}` : "You don't have a loqs channel set up!",
        userId: interaction.user.id,
        channelId: logs?.id,
        disabled: !logs,
        color: client.color
      })
    });
  }

  setLogsStatement.run({ id: BigInt(interaction.guildId), logs: BigInt(channel.id) });

  return interaction.reply({
    flags: MessageFlags.IsComponentsV2,
    components: getComponents({
      content: `The loqs channel is now ${channel}`,
      userId: interaction.user.id,
      channelId: channel.id,
      disabled: false,
      color: client.color
    })
  });
}

export function onComponent(
  client: Application,
  interaction: ButtonInteraction<'cached'> | ChannelSelectMenuInteraction<'cached'>
) {
  const setModeEnabled = interaction.isChannelSelectMenu();
  setLogsStatement.run({
    id: BigInt(interaction.guildId),
    logs: setModeEnabled ? BigInt(interaction.values[0]) : null
  });

  return interaction.update({
    flags: MessageFlags.IsComponentsV2,
    components: getComponents({
      content: setModeEnabled
        ? `The loqs channel is now <#${interaction.values[0]}>`
        : 'Successfully reset the loqs channel',
      userId: interaction.user.id,
      channelId: setModeEnabled ? interaction.values[0] : undefined,
      disabled: !setModeEnabled,
      color: client.color
    })
  });
}

export const hasComponent = true;

export const chatInputCommandData = new ChatInputCommandBuilder()
  .setName('loqs')
  .setDescription('Manaqe the loqs channel')
  .setContexts([InteractionContextType.Guild])
  .setIntegrationTypes([ApplicationIntegrationType.GuildInstall])
  .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
  .addChannelOptions(option =>
    option
      .setName('channel')
      .setDescription('Set loqs channel')
      .setChannelTypes(ChannelType.GuildText, ChannelType.GuildAnnouncement)
      .setRequired(false)
  )
  .toJSON();
