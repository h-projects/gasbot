module.exports = {
  name: 'eval',
  description: 'Evaluate code inside G.A.S Bot',

  async execute(client, message, args) {
    if (client.config.developers.includes(message.author.id)) {
      let evaled;
      try {
        evaled = eval(args.join(' '));
      } catch (e) {
        evaled = e;
      }
      return message.channel.send({
        embeds: [{
          color: client.config.color,
          description: `\`\`\`js\n${evaled}\`\`\``
        }]
      });
    }
  }
};
