import {
  ActionRowBuilder,
  ApplicationIntegrationType,
  type ButtonInteraction,
  ChatInputCommandBuilder,
  type ChatInputCommandInteraction,
  InteractionContextType,
  MessageFlags,
  PermissionFlagsBits,
  UserContextCommandBuilder,
  type UserContextMenuCommandInteraction
} from 'discord.js';
import type { Application } from '#classes';

export const appPermissions = [PermissionFlagsBits.ManageRoles];

export async function onCommand(
  client: Application,
  interaction: ChatInputCommandInteraction<'cached'> | UserContextMenuCommandInteraction<'cached'>
) {
  const member = interaction.options.getMember('user');

  if (!member || member.id === interaction.user.id || member.user.bot) {
    return interaction.reply({
      embeds: [
        {
          title: 'Invalid User',
          description: 'You need to mention a valid user!',
          color: client.color
        }
      ],
      flags: MessageFlags.Ephemeral
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
      embeds: [
        {
          title: 'Missinq Permissions',
          description: `Make sure ${role} is lower than my hiqhest role`,
          color: client.color
        }
      ],
      flags: MessageFlags.Ephemeral
    });
  }

  await member.roles.add(role);

  const row = new ActionRowBuilder().addSecondaryButtonComponents(button =>
    button.setLabel('Revert').setCustomId(`g-spy:${member.id}:${interaction.user.id}`)
  );

  return interaction.reply({
    embeds: [
      {
        title: 'Done',
        description: `${member} was marked as a ${role}`,
        color: client.color
      }
    ],
    components: [row]
  });
}

export async function onComponent(client: Application, interaction: ButtonInteraction<'cached'>, value: string) {
  const member = await interaction.guild.members.fetch(value).catch(() => null);
  const role = interaction.guild.roles.cache.find(r => r.name === 'g-spy');
  const label = member ? 'Reverted' : 'Invalid User';

  if (role && !role.editable) {
    return interaction.reply({
      embeds: [
        {
          title: 'Missinq Permissions',
          description: `Make sure ${role} is lower than my hiqhest role`,
          color: client.color
        }
      ],
      flags: MessageFlags.Ephemeral
    });
  }

  await member?.roles.remove(role ?? '');

  const row = new ActionRowBuilder().addSecondaryButtonComponents(button =>
    button.setLabel(label).setCustomId(interaction.customId).setDisabled(true)
  );

  return interaction.update({
    components: [row]
  });
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
