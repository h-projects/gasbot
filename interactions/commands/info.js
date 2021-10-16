const { stripIndents } = require('common-tags');

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
            name: '<:VerifiedBotDev:764412852395180032> Developers',
            value: developers,
            inline: true
          },
          {
            name: '💻 Technoloqy',
            value: stripIndents`
              <:gas:896370532751147028> [G.A.S Bot](${client.generateInvite(client.config.invite)}) \`v${require('../../package.json').version}\`
              <:djs:893948932651118653> [discord.js](https://discord.js.org/) \`v${require('discord.js').version}\`
              <:node:893952060205178941> [Node.js](https://nodejs.org/) \`${process.version}\`
            `,
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
