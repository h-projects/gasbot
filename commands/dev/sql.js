module.exports = {
  name: 'sql',
  description: 'Execute SQLite statements',

  async execute(client, message, args) {
    if (!client.config.developers.includes(message.author.id) || message.content.toUpperCase().includes('DROP')) {
      return;
    }

    const [ action, ...statement ] = args;
    let db;
    let error;
    try {
      db = client.db.prepare(statement.join(' '));
    } catch (err) {
      error = err;
    }

    let result;
    if (action === 'get') {
      result = db?.get();
    }

    if (action === 'run') {
      result = db?.run();
    }
    message.channel.send({
      embeds: [{
        title: 'SQL',
        description: `\`\`\`js\n${result ? JSON.stringify(result) : error}\`\`\``,
        color: client.config.color
      }]
    });
  }
};
