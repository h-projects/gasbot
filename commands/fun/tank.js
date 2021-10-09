module.exports = {
  name: 'tank',
  description: 'aden said <:NoSeventhLetter:721649657146769449>, use this',
  async execute(client, message) {
    message.channel.send({
      embeds: [{
        title: 'the ultimate g destroyer',
        image: {
          url: 'https://cdn.discordapp.com/attachments/713675042143076356/896324390252322826/GAS_Bot-Tank-896324388658499584.png'
        },
        color: client.config.color
      }]
    });
  }
};

