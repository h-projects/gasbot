const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
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
  },

  data: new SlashCommandBuilder()
    .setName('hromomento')
    .setDescription('aqui tenemos un qran bro momento')
};
