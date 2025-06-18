import { ApplicationIntegrationType, type Interaction } from 'discord.js';
import type { Application } from '#classes';
import { logger } from '#util';

export function run(client: Application, interaction: Interaction) {
  if (interaction.isChatInputCommand()) {
    const command = client.chatInputCommands.get(interaction.commandName);

    if (!command) {
      return logger.warn(`Unknown chat input command: ${interaction.commandName}`);
    }

    if (
      interaction.inRawGuild() &&
      command.slashCommandData.integration_types?.includes(ApplicationIntegrationType.UserInstall) === false
    ) {
      return interaction.reply({
        content: "The bot wasn't invited properly, please invite it with the correct scopes",
        ephemeral: true
      });
    }

    if (command.appPermissions && !interaction.appPermissions.has(command.appPermissions)) {
      return interaction.reply({
        embeds: [
          {
            title: 'Missinq Permissions',
            description: `I need the \`${command.appPermissions}\` permission to use this command`,
            color: client.color
          }
        ],
        ephemeral: true
      });
    }

    const run = command.onSlashCommand ?? command.onCommand ?? command.onInteraction;
    return run?.(client, interaction);
  }

  if (interaction.isContextMenuCommand()) {
    const command = client.contextMenuCommands.get(interaction.commandName);

    if (!command) {
      return logger.warn(`Unknown context menu command: ${interaction.commandName}`);
    }

    if (
      interaction.inRawGuild() &&
      command.contextMenuCommandData.integration_types?.includes(ApplicationIntegrationType.UserInstall) === false
    ) {
      return interaction.reply({
        content: "The bot wasn't invited properly, please invite it with the correct scopes",
        ephemeral: true
      });
    }

    if (!client.developers.includes(interaction.user.id) && command.dev) {
      return;
    }

    if (command.appPermissions && !interaction.appPermissions.has(command.appPermissions)) {
      return interaction.reply({
        embeds: [
          {
            title: 'Missinq Permissions',
            description: `I need the \`${command.appPermissions}\` permission to use this command`,
            color: client.color
          }
        ],
        ephemeral: true
      });
    }

    const run = command.onContextMenuCommand ?? command.onCommand ?? command.onInteraction;
    return run?.(client, interaction);
  }

  if (interaction.isMessageComponent()) {
    const [name, value, author] = interaction.customId.split(':');
    const component = client.components.get(name);

    if (!component) {
      return logger.warn(`Unknown component: ${name}`);
    }

    if (author !== interaction.user.id) {
      return interaction.reply({ content: 'Only the user who created this component can use it', ephemeral: true });
    }

    if (component.appPermissions && !interaction.appPermissions.has(component.appPermissions)) {
      return interaction.reply({
        embeds: [
          {
            title: 'Missinq Permissions',
            description: `I need the \`${component.appPermissions}\` permission to use this component`,
            color: client.color
          }
        ],
        ephemeral: true
      });
    }

    const run = component.onComponent ?? component.onInteraction;
    return run?.(client, interaction, value);
  }
}
