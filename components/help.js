module.exports = {
  name: 'help',
  async execute(client, interaction) {
    const category = client.commands.filter(command => command.category === interaction.value && !command.hidden);

    const fields = category.map(command => ({
      name: `\`/${command.data.name}\``,
      value: command.data.description
    }));

    const categoryTitle = {
      bot: '🤖 Bot Commands',
      fun: '🥳 Fun Commands',
      dev: '<:VerifiedBotDev:764412852395180032> Dev Tools'
    };

    const buttons = [
      {
        type: 'BUTTON',
        style: 'SECONDARY',
        label: 'Bot',
        customId: `help:bot:${interaction.author}`,
        disabled: interaction.value === 'bot',
        emoji: '🤖'
      },
      {
        type: 'BUTTON',
        style: 'SECONDARY',
        label: 'Fun',
        customId: `help:fun:${interaction.author}`,
        disabled: interaction.value === 'fun',
        emoji: '🥳'
      }
    ];

    if (client.config.developers.includes(interaction.author)) {
      buttons.push({
        type: 'BUTTON',
        style: 'SECONDARY',
        label: 'Dev',
        customId: `help:dev:${interaction.author}`,
        disabled: interaction.value === 'dev',
        emoji: '855104541967384616'
      });
    }

    interaction.update({
      embeds: [{
        title: categoryTitle[interaction.value],
        color: client.config.color,
        fields
      }],
      components: [{
        type: 'ACTION_ROW',
        components: buttons
      }]
    });
  }
};
