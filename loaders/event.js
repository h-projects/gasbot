const { readdirSync } = require('fs');

module.exports = async client => {
  const eventFiles = readdirSync('./events').filter(file => file.endsWith('.js'));
  for (const file of eventFiles) {
    const event = require(`../events/${file}`);

    client.on(event.name, (...args) => event.execute(...args, client));
  }
};
