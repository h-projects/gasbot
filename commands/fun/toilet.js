module.exports = {
  name: 'toilet',
  description: 'polish toilet',
  async execute(client, message) {
    message.channel.send({
      embeds: [{
        title: 'polish toilet',
        image: {
          url: 'https://c.tenor.com/4vgPhxKQw_MAAAAS/polish-toilet.gif'
        },
        color: client.config.color
      }]
    });
  }
};
