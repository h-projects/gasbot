module.exports = {
  name: 'interactionCreate',
  once: false,
  async execute(interaction, client) {
    if (interaction.inRawGuild()) {
      return interaction.reply({
        content: 'The bot wasn\'t invited correctly, please invite it with the correct scopes',
        ephemeral: true
      });
    }

    if (interaction.isApplicationCommand()) {
      const name = interaction.commandName;
      const command = client.interactions.commands.get(name) ?? client.interactions.commands.find(c => c.contextData?.name === name);

      if (!command) return;

      if (interaction.guild && !interaction.guild.me.permissions.has(command.botPermissions ?? 0n)) {
        return interaction.reply({
          embeds: [{
            title: 'Missinq Permissions',
            description: `I need the \`${command.botPermissions}\` permission to use this command`,
            color: client.config.color
          }],
          ephemeral: true
        });
      }

      if (!client.config.developers.includes(interaction.user.id) && command.category === 'dev') {
        return;
      }

      return command.execute(client, interaction);
    }

    if (interaction.isMessageComponent()) {
      [interaction.name, interaction.value, interaction.author] = interaction.customId.split(':');
      const component = client.interactions.components.get(interaction.name);

      if (!component || interaction.author !== interaction.user.id) {
        return interaction.deferUpdate();
      }

      if (interaction.guild && !interaction.guild.me.permissions.has(component.botPermissions ?? 0n)) {
        return interaction.reply({
          embeds: [{
            title: 'Missinq Permissions',
            description: `I need the \`${component.botPermissions}\` permission to use this component`,
            color: client.config.color
          }],
          ephemeral: true
        });
      }

      component.execute(client, interaction);
    }
  }
};
