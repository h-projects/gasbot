const { SlashCommandBuilder, ContextMenuCommandBuilder } = require('@discordjs/builders');
const { PermissionFlagsBits, ApplicationCommandType } = require('discord-api-types/v10');

module.exports = {
  botPermissions: ['MANAGE_ROLES'],
  async execute(client, interaction) {
    const member = interaction.options.getMember('user');

    if (!member || member.id === interaction.user.id || member.user.bot) {
      return interaction.reply({
        embeds: [{
          title: 'Invalid User',
          description: 'You need to mention a valid user!',
          color: client.config.color
        }],
        ephemeral: true
      });
    }

    const role = interaction.guild.roles.cache.find(r => r.name === 'g-spy') ?? await interaction.guild.roles.create({
      name: 'g-spy',
      reason: 'Found a g-spy'
    });

    if (!role.editable) {
      return interaction.reply({
        embeds: [{
          title: 'Missinq Permissions',
          description: `Make sure ${role} is lower than my hiqhest role`,
          color: client.config.color
        }],
        ephemeral: true
      });
    }

    member.roles.add(role);
    interaction.reply({
      embeds: [{
        title: 'Done',
        description: `${member} was marked as a ${role}`,
        color: client.config.color
      }],
      components: [{
        type: 'ACTION_ROW',
        components: [{
          type: 'BUTTON',
          style: 'SECONDARY',
          label: 'Revert',
          customId: `g-spy:${member.id}:${interaction.user.id}`
        }]
      }]
    });
  },

  data: new SlashCommandBuilder()
    .setName('g-spy')
    .setDescription('Mark a user as a g-spy')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
    .setDMPermission(false)
    .addUserOption(option => option
      .setName('user')
      .setDescription('User to mark as g-spy')
    ),

  contextData: new ContextMenuCommandBuilder()
    .setName('Mark as G Spy')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
    .setDMPermission(false)
    .setType(ApplicationCommandType.User)
};
