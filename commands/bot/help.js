module.exports = {
  name: 'help',
  description: 'Views all commands in the bot',
  hidden: true,

  async execute(client, message, args) {
    const buttons = [
      {
        type: 'BUTTON',
        style: 'SECONDARY',
        label: 'Bot',
        custom_id: `help:bot:${message.author.id}`,
        emoji: '🤖'
      },
      {
        type: 'BUTTON',
        style: 'SECONDARY',
        label: 'Fun',
        custom_id: `help:fun:${message.author.id}`,
        emoji: '🥳'
      }
    ];
    
    client.config.owners.includes(message.author.id) && buttons.push({
      type: 'BUTTON',
      style: 'SECONDARY',
      label: 'Dev',
      custom_id: `help:dev:${message.author.id}`,
      emoji: '855104541967384616'
    });


    message.channel.send({
      embeds: [{
        title: `${client.emojis.cache.get('855788595830194196')} G.A.S Bot Help`,
        description: 'Press a button to view commands in that cateqory',
        color: client.config.color
      }],
      components: [{
        type: 'ACTION_ROW',
        components: buttons
      }]
    });
  }
};
