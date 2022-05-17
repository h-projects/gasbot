const { Collection } = require('discord.js');
const { readdirSync } = require('fs');

module.exports = async client => {
  client.commands = new Collection();
  const commandFolders = readdirSync('./commands');

  for (const folder of commandFolders) {
    const commandFiles = readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
      const command = require(`../commands/${folder}/${file}`);
      client.commands.set(command.name, command);
      command.category = folder;
    }
  }
};
