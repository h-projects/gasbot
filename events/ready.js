const { Routes } = require('discord-api-types/v10');

module.exports = {
  name: 'ready',
  once: true,
  async execute(client) {
    const commands = [];
    const devCommands = [];

    if (process.argv[2] === 'no-deploy') return console.log('Ready!');
    client.interactions.commands.forEach(command => {
      command.category === 'dev' ?
        devCommands.push(command.data.toJSON()) :
        commands.push(command.data.toJSON());

      if (command.contextData) {
        command.category === 'dev' ?
          devCommands.push(command.contextData.toJSON()) :
          commands.push(command.contextData.toJSON());
      }
    });

    await client.restModule.put(Routes.applicationCommands(client.user.id), {
      body: commands
    });

    console.log(`Deployed ${commands.length} global commands`);

    await client.restModule.put(Routes.applicationGuildCommands(client.user.id, client.config.testServer), {
      body: devCommands
    });

    console.log(`Deployed ${devCommands.length} dev commands`);

    console.log('Ready!');
  }
};
