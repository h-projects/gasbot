module.exports = {
  name: 'info',
  async execute(client, interaction) {
    const developers = (await Promise.all(client.config.developers.map(async id => (await client.users.fetch(id)).tag))).join('\n');
    interaction.reply({
      embeds: [{
        title: 'Info',
        color: client.config.color,
        fields: [
          {
            name: 'G.A.S Bot',
            value: 'G.A.S Bot was created to defeat the letter G.'
          },
          {
            name: 'G Removal',
            value: 'By default, it removes standalone G, and it can be chanqed to three different detection levels'
          },
          {
            name: '<:VerifiedBotDev:855104541967384616> Developers',
            value: developers,
            inline: true
          },
          {
            name: '💻 Technoloqy',
            value: `<:gas_new:855788595830194196> [G.A.S Bot](${client.generateInvite(client.config.invite)}) \`v${require('../../package.json').version}\`\n<:djs:893948932651118653> [discord.js](https://discord.js.org/) \`v${require('discord.js').version}\`\n<:node:893952060205178941> [node.js](https://nodejs.org/) \`${process.version}\``,
            inline: true
          }
        ],
        thumbnail: {
          url: client.user.displayAvatarURL()
        }
      }]
    });
  }
};
