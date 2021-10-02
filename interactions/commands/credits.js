module.exports = {
  name: 'credits',
  async execute(client, interaction) {
    const developers = (await Promise.all(client.config.developers.map(async id => (await client.users.fetch(id)).tag))).join('\n');
    const specialThanksUsers = (await Promise.all(client.config.specialThanksUsers.map(async id => (await client.users.fetch(id)).tag))).join('\n');
    interaction.reply({
      embeds: [{
        title: 'Credits',
        fields: [
          { name: '<:VerifiedBotDev:855104541967384616> Developers', value: developers, inline: true },
          { name: '⭐ Special Thanks', value: specialThanksUsers, inline: true }
        ],
        color: client.config.color
      }]
    });
  }
};
