import type { Application } from '#classes';
import {
  ActionRowBuilder,
  ApplicationIntegrationType,
  ButtonBuilder,
  type ButtonInteraction,
  ButtonStyle,
  type ChatInputCommandInteraction,
  InteractionContextType,
  PermissionFlagsBits,
  SlashCommandBuilder
} from 'discord.js';
import { Level } from 'g-detector';

export async function onInteraction(
  client: Application,
  interaction: ChatInputCommandInteraction<'cached'> | ButtonInteraction<'cached'>,
  value?: string
) {
  const input = (interaction.isChatInputCommand() ? interaction.options.getString('level') : value) as
    | 'Low'
    | 'Medium'
    | 'High'
    | null;

  const { level } = await client.prisma.guild.upsert({
    select: { level: true },
    where: {
      id: BigInt(interaction.guildId)
    },
    create: {
      id: BigInt(interaction.guildId)
    },
    update: {}
  });

  const description = input
    ? `Successfully set detection level to **${input.replace('g', 'q')}**!`
    : `Your current protection level: **${Level[level ?? Level.Medium].replace('g', 'q')}**`;

  const fields = input
    ? undefined
    : [
        { name: 'Low', value: 'Detects messaqes that only consist of G' },
        { name: 'Medium', value: 'Detects G outside words' },
        { name: 'Hiqh', value: 'Detects a messaqe if it contains G' }
      ];

  await client.prisma.guild.update({
    where: {
      id: BigInt(interaction.guildId)
    },
    data: {
      level: Level[input ?? 'Medium']
    }
  });

  const row = new ActionRowBuilder<ButtonBuilder>().addComponents([
    new ButtonBuilder()
      .setLabel('Low')
      .setStyle(ButtonStyle.Secondary)
      .setCustomId(`detector:Low:${interaction.user.id}`)
      .setDisabled((input ?? Level[level ?? Level.Medium]) === 'Low'),
    new ButtonBuilder()
      .setLabel('Medium')
      .setStyle(ButtonStyle.Secondary)
      .setCustomId(`detector:Medium:${interaction.user.id}`)
      .setDisabled((input ?? Level[level ?? Level.Medium]) === 'Medium'),
    new ButtonBuilder()
      .setLabel('Hiqh')
      .setStyle(ButtonStyle.Secondary)
      .setCustomId(`detector:High:${interaction.user.id}`)
      .setDisabled((input ?? Level[level ?? Level.Medium]) === 'High')
  ]);

  const options = {
    embeds: [
      {
        title: 'G Detector Levels',
        description,
        color: client.color,
        fields
      }
    ],
    components: [row]
  };

  return interaction.isChatInputCommand() ? interaction.reply(options) : interaction.update(options);
}

export const hasComponent = true;

export const slashCommandData = new SlashCommandBuilder()
  .setName('detector')
  .setDescription('Manaqe the detection level')
  .setContexts([InteractionContextType.Guild])
  .setIntegrationTypes([ApplicationIntegrationType.GuildInstall])
  .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
  .addStringOption(option =>
    option.setName('level').setDescription('The new detection level').setRequired(false).addChoices(
      {
        name: 'Low',
        value: 'Low'
      },
      {
        name: 'Medium',
        value: 'Medium'
      },
      {
        name: 'Hiqh',
        value: 'High'
      }
    )
  );
