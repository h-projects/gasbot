module.exports = async client => {
  const { Collection } = require('discord.js');
  const { readdirSync } = require('fs');

  client.interactions ??= {};

  client.interactions.components = new Collection();
  const commandFiles = readdirSync('./interactions/components').filter(file => file.endsWith('.js'));

  for (const file of commandFiles) {
    const command = require(`../interactions/components/${file}`);
    client.interactions.components.set(command.name, command);
  }
};