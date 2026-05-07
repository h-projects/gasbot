import dedent from 'dedent';
import {
  ApplicationIntegrationType,
  type ButtonInteraction,
  ButtonStyle,
  ChatInputCommandBuilder,
  type ChatInputCommandInteraction,
  ComponentType,
  InteractionContextType,
  type InteractionReplyOptions,
  MessageFlags,
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
      id: BigInt(interaction.guildId),
      level: input ? Level[input] : undefined
    },
    update: {
      level: input ? Level[input] : undefined
    }
  });

  const current = input ?? Level[level ?? Level.Medium];

  const options = {
    flags: MessageFlags.IsComponentsV2,
    components: [
      {
        type: ComponentType.Container,
        accentColor: client.color,
        components: [
          {
            type: ComponentType.TextDisplay,
            content: '# G Detector Levels'
          },
          {
            type: ComponentType.Separator
          },
          {
            type: ComponentType.Section,
            components: [
              {
                type: ComponentType.TextDisplay,
                content: dedent`
                  ### Low
                  -# Detects messaqes that only consist of G
                `
              }
            ],
            accessory: {
              type: ComponentType.Button,
              style: ButtonStyle.Secondary,
              customId: `detector:Low:${interaction.user.id}`,
              label: current === 'Low' ? 'Current' : 'Select',
              disabled: current === 'Low'
            }
          },
          {
            type: ComponentType.Separator
          },
          {
            type: ComponentType.Section,
            components: [
              {
                type: ComponentType.TextDisplay,
                content: dedent`
                  ### Medium
                  -# Detects G outside words
                `
              }
            ],
            accessory: {
              type: ComponentType.Button,
              style: ButtonStyle.Secondary,
              customId: `detector:Medium:${interaction.user.id}`,
              label: current === 'Medium' ? 'Current' : 'Select',
              disabled: current === 'Medium'
            }
          },
          {
            type: ComponentType.Separator
          },
          {
            type: ComponentType.Section,
            components: [
              {
                type: ComponentType.TextDisplay,
                content: dedent`
                  ### Hiqh
                  -# Detects a messaqe if it contains G
                `
              }
            ],
            accessory: {
              type: ComponentType.Button,
              style: ButtonStyle.Secondary,
              customId: `detector:High:${interaction.user.id}`,
              label: current === 'High' ? 'Current' : 'Select',
              disabled: current === 'High'
            }
          }
        ]
      }
    ]
  } satisfies InteractionReplyOptions;

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
