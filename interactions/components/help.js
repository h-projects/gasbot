module.exports = {
  name: 'help',

  async execute(client, interaction) {
    const fields = [];
    const category = client.commands.filter(command => command.category === interaction.value && !command.hidden);
    const prefix = client.db.prepare('SELECT prefix FROM guilds WHERE id = ?').get(interaction.guildId)?.prefix ?? client.prefix;

    category.map(command => {
      fields.push({
        name: `\`${prefix}${command.name}\``,
        value: command.description,
        inline: false
      });
    });

    const info = {
      bot: {
        title: '🤖 Bot Commands',
        description: `${client.emojis.cache.get('855794356904656906')} Works in Slash Commands too!`
      },

      fun: {
        title: '🥳 Fun Commands'
      },

      dev: {
        title: `${client.emojis.cache.get('855104541967384616')} Dev Tools`
      }
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

    if (client.config.owners.includes(interaction.author)) {
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
        title: info[interaction.value].title,
        description: info[interaction.value].description,
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
