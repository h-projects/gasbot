import { ChatInputCommandBuilder } from '@discordjs/builders';
import dedent from 'dedent';
import {
  ApplicationIntegrationType,
  type ButtonInteraction,
  ButtonStyle,
  type ChatInputCommandInteraction,
  ComponentType,
  InteractionContextType,
  type InteractionReplyOptions,
  MessageFlags,
  PermissionFlagsBits
} from 'discord.js';
import { Level } from 'g-detector';
import type { Application } from '#classes';
import { database } from '#database';

const getLevelStatement = database.prepare('SELECT level FROM guilds WHERE id = ?');
const setLevelStatement = database.prepare(`
  INSERT INTO guilds (id, level) VALUES (@id, @level) ON CONFLICT (id) DO
    UPDATE SET level = excluded.level
`);

function getLevel(guildId: string) {
  const result = getLevelStatement.get(BigInt(guildId));
  return result ? Number(result.level) : null;
}

export function onInteraction(
  client: Application,
  interaction: ChatInputCommandInteraction<'cached'> | ButtonInteraction<'cached'>,
  value?: string
) {
  const input = interaction.isChatInputCommand() ? interaction.options.getInteger('level') : Number(value);

  if (input !== null) {
    setLevelStatement.run({
      id: BigInt(interaction.guildId),
      level: input
    });
  }

  const level = input ?? getLevel(interaction.guildId) ?? Level.Medium;

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
              customId: `detector:${Level.Low}:${interaction.user.id}`,
              label: level === Level.Low ? 'Current' : 'Select',
              disabled: level === Level.Low
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
              customId: `detector:${Level.Medium}:${interaction.user.id}`,
              label: level === Level.Medium ? 'Current' : 'Select',
              disabled: level === Level.Medium
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
              customId: `detector:${Level.High}:${interaction.user.id}`,
              label: level === Level.High ? 'Current' : 'Select',
              disabled: level === Level.High
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
  .addIntegerOptions(option =>
    option.setName('level').setDescription('The new detection level').setRequired(false).setChoices(
      {
        name: 'Low',
        value: 0
      },
      {
        name: 'Medium',
        value: 1
      },
      {
        name: 'Hiqh',
        value: 2
      }
    )
  )
  .toJSON();
