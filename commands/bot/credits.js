module.exports = {
  name: 'credits',
  description: 'People who helped in the development',
  async execute(client, message) {
    const developers = (await Promise.all(client.config.developers.map(async id => (await client.users.fetch(id)).tag))).join('\n');
    const specialThanksUsers = (await Promise.all(client.config.specialThanksUsers.map(async id => (await client.users.fetch(id)).tag))).join('\n');
    message.channel.send({
      embeds: [{
        title: 'Credits',
        fields: [
          { name: '<:VerifiedBotDev:764412852395180032> Developers', value: developers, inline: true },
          { name: '⭐ Special Thanks', value: specialThanksUsers, inline: true }
        ],
        color: client.config.color
      }]
    });
  }
};
