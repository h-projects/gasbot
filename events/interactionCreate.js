module.exports = {
  name: 'interactionCreate',
  once: false,
  async execute(interaction, client) {
    switch (interaction.type) {
      case 'APPLICATION_COMMAND':
        const name = interaction.commandName;
        const command = client.interactions.commands.get(name) ?? client.interactions.commands.find(cmd => name === cmd.contextMenu);

        if (!command || !interaction.inGuild()) return;

        if (!interaction.member.permissions.has(command.permissions ?? 0)) {
          return interaction.reply({
            content: `You need the \`${command.permissions}\` permission to use this command`,
            ephemeral: true
          });
        }

        command.execute(client, interaction);
      break;


      case 'MESSAGE_COMPONENT':
        [interaction.name, interaction.value, interaction.author] = interaction.customId.split(':');
        const component = client.interactions.components.get(interaction.name);

        if (!component || interaction.author !== interaction.user.id) {
          return interaction.deferUpdate();
        }

        if (!interaction.member.permissions.has(component.permissions ?? 0)) {
          return interaction.reply({
            content: `You need the \`${component.permissions}\` permission to use this component`,
            ephemeral: true
          });
        }

        component.execute(client, interaction);
      break;
    }
  }
};
