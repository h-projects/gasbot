import type { Application } from '#classes';
import { logger } from '#util';
import type { Interaction } from 'discord.js';

export function run(client: Application, interaction: Interaction) {
  if (interaction.inRawGuild() && interaction.isCommand()) {
    return interaction.reply({
      content: "The bot wasn't invited correctly, please invite it with the correct scopes",
      ephemeral: true
    });
  }

  if (interaction.isChatInputCommand()) {
    const command = client.chatInputCommands.get(interaction.commandName);

    if (!command) {
      return logger.warn(`Unknown chat input command: ${interaction.commandName}`);
    }

    if (!client.developers.includes(interaction.user.id) && command.dev) {
      return;
    }

    if (command.appPermissions && !interaction.appPermissions?.has(command.appPermissions ?? 0n)) {
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

    if (!client.developers.includes(interaction.user.id) && command.dev) {
      return;
    }

    if (command.appPermissions && !interaction.appPermissions?.has(command.appPermissions ?? 0n)) {
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

    if (component.appPermissions && !interaction.appPermissions?.has(component.appPermissions ?? 0n)) {
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
