module.exports = {
  name: 'toilet',
  description: 'polish toilet',
  async execute(client, message) {
    message.channel.send({
      embeds: [{
        title: 'polish toilet',
        image: {
          url: 'https://cdn.discordapp.com/attachments/896351890609143808/896351917872136222/htoilet.gif'
        },
        color: client.config.color
      }]
    });
  }
};
