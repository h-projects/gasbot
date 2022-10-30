import type { Application } from '#classes';
import {
  ActionRowBuilder,
  ButtonBuilder,
  type ButtonInteraction,
  ButtonStyle,
  ChannelType,
  type ChatInputCommandInteraction,
  PermissionFlagsBits,
  SlashCommandBuilder
} from 'discord.js';

const getRow = (userId: string, disabled: boolean) =>
  new ActionRowBuilder<ButtonBuilder>().addComponents([
    new ButtonBuilder()
      .setLabel('Reset')
      .setStyle(ButtonStyle.Secondary)
      .setCustomId(`logs::${userId}`)
      .setDisabled(disabled)
  ]);

export async function onSlashCommand(client: Application, interaction: ChatInputCommandInteraction<'cached'>) {
  const channel = interaction.options.getChannel('channel');

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

  if (!channel) {
    const logs = interaction.guild.channels.cache.get(logsId?.toString() ?? '');
    return interaction.reply({
      embeds: [
        {
          title: 'Loqs',
          description: logs ? `The current loqs channel is ${logs}` : "You don't have a loqs channel set up!",
          color: client.color
        }
      ],
      components: logs ? [getRow(interaction.user.id, false)] : []
    });
  }

  await client.prisma.guild.update({
    where: {
      id: BigInt(interaction.guildId)
    },
    data: {
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
    components: [getRow(interaction.user.id, false)]
  });
}

export async function onComponent(client: Application, interaction: ButtonInteraction<'cached'>) {
  await client.prisma.guild.update({
    where: {
      id: BigInt(interaction.guildId)
    },
    data: {
      logs: null
    }
  });

  return interaction.update({
    embeds: [
      {
        title: 'Loqs',
        description: 'Successfully reset the loqs channel',
        color: client.color
      }
    ],
    components: [getRow(interaction.user.id, true)]
  });
}

export const hasComponent = true;

export const slashCommandData = new SlashCommandBuilder()
  .setName('loqs')
  .setDescription('Manaqe the loqs channel')
  .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
  .setDMPermission(false)
  .addChannelOption(option =>
    option
      .setName('channel')
      .setDescription('Set loqs channel')
      .addChannelTypes(ChannelType.GuildText, ChannelType.GuildNews)
      .setRequired(false)
  );
