module.exports = {
  name: 'juan',

  async execute(client, interaction) {
    interaction.reply({
      embeds: [{
        title: 'Juan',
        image: {
          url: 'https://cdn.discordapp.com/attachments/729730142125031505/768799803009269771/hYrZ6QK.png'
        },
        color: client.config.color
      }]
    });
  }
};
