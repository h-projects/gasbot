module.exports = {
  name: 'toilet',

  async execute(client, interaction) {
    interaction.reply({
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
