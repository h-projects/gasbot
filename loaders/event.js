module.exports = async client => {
  const { readdirSync } = require('fs');

  const eventFiles = readdirSync('./events').filter(file => file.endsWith('.js'));
  for (const file of eventFiles) {
    const event = require(`../events/${file}`);
    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args, client));
    } else {
      client.on(event.name, (...args) => event.execute(...args, client));
    }
  }
};
