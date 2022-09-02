const { Collection } = require('discord.js');
const { readdirSync } = require('fs');

module.exports = async client => {
  client.components = new Collection();
  const commandFiles = readdirSync('./components').filter(file => file.endsWith('.js'));

  for (const file of commandFiles) {
    const command = require(`../components/${file}`);
    client.components.set(command.name, command);
  }
};
