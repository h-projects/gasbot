module.exports = {
  name: 'hromomento',
  description: 'aqui tenemos un qran bro momento',
  async execute(client, message) {
    message.channel.send({
      embeds: [{
        title: 'hro momento',
        image: {
          url: 'https://c.tenor.com/jChba0HF5jcAAAAM/brro-momento.gif'
        },
        color: client.config.color
      }]
    });
  }
};
