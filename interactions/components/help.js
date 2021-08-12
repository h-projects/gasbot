module.exports = {
  name: 'help',
  
  async execute(client, interaction) {
    
    
    const category = client.commands.filter(command => command.category === interaction.value && !command.hidden);
    
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
    }
    
    const buttons = [
      {
        type: 'BUTTON',
        style: 'SECONDARY',
        label: 'Bot',
        custom_id: `help:bot:${interaction.author}`,
        disabled: interaction.value == 'bot',
        emoji: '🤖'
      },
      {
        type: 'BUTTON',
        style: 'SECONDARY',
        label: 'Fun',
        custom_id: `help:fun:${interaction.author}`,
        disabled: interaction.value == 'fun',
        emoji: '🥳'
      }
    ];
    
    client.config.owners.includes(interaction.author) && buttons.push({
      type: 'BUTTON',
      style: 'SECONDARY',
      label: 'Dev',
      custom_id: `help:dev:${interaction.author}`,
      disabled: interaction.value == 'dev',
      emoji: '855104541967384616'
    })

    
    const fields = [];
    
    category.forEach(command => {
      
      fields.push({
        name: client.prefix + command.name,
        value: command.description,
        inline: false
      });
      
    });
    

    interaction.update({
      embeds: [{
        title: info[interaction.value].title,
        description: info[interaction.value]?.description,
        color: client.config.color,
        fields: fields
      }],
      components: [{
        type: 'ACTION_ROW',
        components: buttons
      }]
    });
      
  }
};
