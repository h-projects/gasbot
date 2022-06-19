module.exports = {
  name: 'links',
  description: 'Useful bot links',
  async execute(client, message) {
    const nog = '<:nog:676105350306594819>';
    const gas = '<:gas:896370532751147028>';
    const aytchSoftware = '<:AytchSoftware:720949593696894996>';

    await client.application.fetch();

    message.channel.send({
      embeds: [{
        title: 'Links',
        fields: [
          {
            name: `Want to remove ${nog} in your server?`,
            value: `${gas} Invite the bot [here](${client.generateInvite(client.application.installParams ?? client.config.invite)})`
          },
          {
            name: 'Want to support the bot?',
            value: `⬆️ Upvote it [here](${client.config.vote})`
          },
          {
            name: 'Need help?',
            value: `${aytchSoftware} Join the Support Server [here](${client.config.support})`
          },
          {
            name: `Do you hate ${nog}?`,
            value: `${nog} Join the G Annihilation Squad [here](${client.config.gasServer})`
          }
        ],
        color: client.config.color
      }]
    });
  }
};
