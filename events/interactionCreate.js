module.exports = {
  name: 'interactionCreate',
  once: false,
  async execute(interaction, client) {
    
    switch(interaction.type) {
        
      case 'APPLICATION_COMMAND':
        const name = interaction.commandName
        const command = client.interactions.commands.get(name) ?? client.interactions.commands.find(command => name == command.contextMenu)

        if (!command) return;
        return command.execute(client, interaction);
      break;
        
        
      case 'MESSAGE_COMPONENT':
        
        [interaction.name, interaction.value, interaction.author] = interaction.customId.split(':');
        
        if (!client.interactions.components.has(interaction.name) || interaction.author != interaction.user.id) {
          return interaction.deferUpdate();
        }
        
        client.interactions.components.get(interaction.name).execute(client, interaction);
        
      break;
        
    }
    
  }
  
};
