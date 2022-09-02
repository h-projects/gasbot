const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  async execute(client, interaction) {
    interaction.reply({
      embeds: [{
        color: client.config.color,
        description: `**Ponq!** ${client.ws.ping}ms`
      }]
    });
  },

  data: new SlashCommandBuilder()
    .setName('pinq')
    .setDescription('Display the bot\'s latency')
};
