module.exports = {
  name: 'help',
  description: 'Views all commands in the bot',
  hidden: true,
  async execute(client, message) {
    const buttons = [
      {
        type: 'BUTTON',
        style: 'SECONDARY',
        label: 'Bot',
        customId: `help:bot:${message.author.id}`,
        emoji: '🤖'
      },
      {
        type: 'BUTTON',
        style: 'SECONDARY',
        label: 'Fun',
        customId: `help:fun:${message.author.id}`,
        emoji: '🥳'
      }
    ];

    client.config.developers.includes(message.author.id) && buttons.push({
      type: 'BUTTON',
      style: 'SECONDARY',
      label: 'Dev',
      customId: `help:dev:${message.author.id}`,
      emoji: '855104541967384616'
    });


    message.channel.send({
      embeds: [{
        title: '<:gas:896370532751147028> G.A.S Bot Help',
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