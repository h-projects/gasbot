module.exports = {
  name: 'hromomento',
  description: 'aqui tenemos un qran bro momento',
  async execute(client, message) {
    message.channel.send({
      embeds: [{
        title: 'hro momento',
        image: {
          url: 'https://tenor.com/view/bruh-momento-dance-breakdancing-gif-15163432'
        },
        color: client.config.color
      }]
    });
  }
};
