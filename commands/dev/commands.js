module.exports = {
  name: 'commands',
  description: 'Manaqe the application commands',
  async execute(client, message, args) {
    if (!client.config.developers.includes(message.author.id)) {
      return;
    }

    const [ action, ...json ] = args;
    await client.application.commands.fetch();

    let response;
    switch (action) {
      case 'find':
        response = client.application.commands.cache.find(c => c.name === args[1])?.id;
        break;

      case 'edit':
        response = await client.application.commands.cache.get(json.shift()).edit(JSON.parse(json.join(' '))).catch(err => err);
        break;

      case 'create':
        response = await client.application.commands.create(JSON.parse(json.join(' '))).catch(err => err);
        break;

      case 'set':
        response = await client.application.commands.set(JSON.parse(json.join(' '))).catch(err => err);
        break;

      case 'delete':
        response = await client.application.commands.cache.get(args[1]).delete().catch(err => err);
        break;
    }

    message.channel.send({
      embeds: [{
        title: 'Application Commands Manaqer',
        description: `\`\`\`js\n${response}\`\`\``,
        color: client.config.color
      }]
    });
  }
};
