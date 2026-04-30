import {
  ApplicationIntegrationType,
  type ButtonInteraction,
  ButtonStyle,
  ChatInputCommandBuilder,
  type ChatInputCommandInteraction,
  ComponentType,
  type GuildMember,
  InteractionContextType,
  MessageFlags,
  PermissionFlagsBits,
  type Role,
  UserContextCommandBuilder,
  type UserContextMenuCommandInteraction
} from 'discord.js';
import type { Application } from '#classes';

export const appPermissions = [PermissionFlagsBits.ManageRoles];

const getMissingPermissionsComponent = (client: Application, role: Role) => [
  {
    type: ComponentType.Container,
    accentColor: client.color,
    components: [
      {
        type: ComponentType.TextDisplay,
        content: '# Missinq Permissions'
      },
      {
        type: ComponentType.Separator
      },
      {
        type: ComponentType.TextDisplay,
        content: `Make sure ${role} is lower than my hiqhest role`
      }
    ]
  }
];

const getSuccessComponent = (
  client: Application,
  interaction:
    | ChatInputCommandInteraction<'cached'>
    | UserContextMenuCommandInteraction<'cached'>
    | ButtonInteraction<'cached'>,
  member: GuildMember | null,
  role?: Role
) => [
  {
    type: ComponentType.Container,
    accentColor: client.color,
    components: [
      {
        type: ComponentType.TextDisplay,
        content: '# Done'
      },
      {
        type: ComponentType.Separator
      },
      {
        type: ComponentType.TextDisplay,
        content: `${member} was marked as a ${role}`
      },
      {
        type: ComponentType.Separator
      },
      {
        type: ComponentType.ActionRow,
        components: [
          {
            type: ComponentType.Button,
            style: ButtonStyle.Secondary,
            customId: interaction.isButton() ? interaction.customId : `g-spy:${member?.id}:${interaction.user.id}`,
            label: interaction.isButton() ? (member ? 'Reverted' : 'Invalid User') : 'Revert',
            disabled: interaction.isButton()
          }
        ]
      }
    ]
  }
];

export async function onCommand(
  client: Application,
  interaction: ChatInputCommandInteraction<'cached'> | UserContextMenuCommandInteraction<'cached'>
) {
  const member = interaction.options.getMember('user');

  if (!member || member.id === interaction.user.id || member.user.bot) {
    return interaction.reply({
      components: [
        {
          type: ComponentType.Container,
          accentColor: client.color,
          components: [
            {
              type: ComponentType.TextDisplay,
              content: '# Invalid User'
            },
            {
              type: ComponentType.Separator
            },
            {
              type: ComponentType.TextDisplay,
              content: "That's not a valid user ☹️"
            }
          ]
        }
      ],
      flags: MessageFlags.Ephemeral | MessageFlags.IsComponentsV2
    });
  }

  const role =
    interaction.guild.roles.cache.find(r => r.name === 'g-spy') ??
    (await interaction.guild.roles.create({
      name: 'g-spy',
      reason: 'Found a g-spy'
    }));

  if (!role.editable) {
    return interaction.reply({
      components: getMissingPermissionsComponent(client, role),
      flags: MessageFlags.Ephemeral | MessageFlags.IsComponentsV2
    });
  }

  await member.roles.add(role);

  return interaction.reply({
    flags: MessageFlags.IsComponentsV2,
    components: getSuccessComponent(client, interaction, member, role),
    allowedMentions: {
      parse: []
    }
  });
}

export async function onComponent(client: Application, interaction: ButtonInteraction<'cached'>, value: string) {
  const member = await interaction.guild.members.fetch(value).catch(() => null);
  const role = interaction.guild.roles.cache.find(r => r.name === 'g-spy');

  if (role && !role.editable) {
    return interaction.reply({
      components: [
        {
          type: ComponentType.Container,
          accentColor: client.color,
          components: [
            {
              type: ComponentType.TextDisplay,
              content: '# Missinq Permissions'
            },
            {
              type: ComponentType.Separator
            },
            {
              type: ComponentType.TextDisplay,
              content: `Make sure ${role} is lower than my hiqhest role`
            }
          ]
        }
      ],
      flags: MessageFlags.Ephemeral | MessageFlags.IsComponentsV2
    });
  }

  if (role) {
    await member?.roles.remove(role);
  }

  return interaction.update({ components: getSuccessComponent(client, interaction, member, role) });
}

export const hasComponent = true;

export const chatInputCommandData = new ChatInputCommandBuilder()
  .setName('g-spy')
  .setDescription('Mark a user as a g-spy')
  .setContexts([InteractionContextType.Guild])
  .setIntegrationTypes([ApplicationIntegrationType.GuildInstall])
  .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
  .addUserOptions(option => option.setName('user').setDescription('User to mark as g-spy').setRequired(true))
  .toJSON();

export const contextMenuCommandData = new UserContextCommandBuilder()
  .setName('Mark as G Spy')
  .setContexts([InteractionContextType.Guild])
  .setIntegrationTypes([ApplicationIntegrationType.GuildInstall])
  .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
  .toJSON();
