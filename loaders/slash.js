module.exports = async (client) => {
  
  const { Collection } = require('discord.js');
  const { readdirSync } = require('fs');
  
  client.interactions ??= {}
  
  client.interactions.commands = new Collection();
  const commandFiles = readdirSync('./interactions/commands').filter(file => file.endsWith('.js'));
  
  for (const file of commandFiles) {
    const command = require(`../interactions/commands/${file}`);
    client.interactions.commands.set(command.name, command);
  }
  
}
