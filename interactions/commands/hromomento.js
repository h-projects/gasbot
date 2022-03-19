module.exports = {
  name: 'hromomento',

  async execute(client, interaction) {
    interaction.reply({
      embeds: [{
        title: 'hro momento',
        image: {
          url: 'https://c.tenor.com/jChba0HF5jcAAAAM/brro-momento.gif'
        },
        color: client.config.color
      }]
    });
  }
};
