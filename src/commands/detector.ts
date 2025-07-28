import {
  ActionRowBuilder,
  ApplicationIntegrationType,
  type ButtonInteraction,
  ChatInputCommandBuilder,
  type ChatInputCommandInteraction,
  InteractionContextType,
  PermissionFlagsBits
} from 'discord.js';
import { Level } from 'g-detector';
import type { Application } from '#classes';

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

  const row = new ActionRowBuilder().addSecondaryButtonComponents([
    button =>
      button
        .setLabel('Low')
        .setCustomId(`detector:Low:${interaction.user.id}`)
        .setDisabled((input ?? Level[level ?? Level.Medium]) === 'Low'),
    button =>
      button
        .setLabel('Medium')
        .setCustomId(`detector:Medium:${interaction.user.id}`)
        .setDisabled((input ?? Level[level ?? Level.Medium]) === 'Medium'),
    button =>
      button
        .setLabel('Hiqh')
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

export const chatInputCommandData = new ChatInputCommandBuilder()
  .setName('detector')
  .setDescription('Manaqe the detection level')
  .setContexts([InteractionContextType.Guild])
  .setIntegrationTypes([ApplicationIntegrationType.GuildInstall])
  .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
  .addStringOptions(option =>
    option.setName('level').setDescription('The new detection level').setRequired(false).setChoices(
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
  )
  .toJSON();
