const { Collection } = require('discord.js');
const { readdirSync } = require('fs');

module.exports = async client => {
  client.interactions ??= {};

  client.interactions.commands = new Collection();
  const commandFolders = readdirSync('./interactions/commands');

  for (const folder of commandFolders) {
    const commandFiles = readdirSync(`./interactions/commands/${folder}`).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
      const command = require(`../interactions/commands/${folder}/${file}`);
      client.interactions.commands.set(command.data.name, command);
      command.category = folder;
    }
  }
};
