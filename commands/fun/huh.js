const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  async execute(client, interaction) {
    interaction.reply({
      embeds: [{
        title: 'huh',
        image: {
          url: 'https://cdn.discordapp.com/emojis/805862278766395483.png?size=4096&quality=lossless'
        },
        color: client.config.color
      }]
    });
  },

  data: new SlashCommandBuilder()
    .setName('huh')
    .setDescription(':thinkinq_h:')
};
