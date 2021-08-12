module.exports = {
  name: 'pinq',
  
  async execute(client, interaction) {
    
		interaction.reply({
      embeds: [{
        color: client.config.color,
        description: `**Ponq!** ${client.ws.ping}ms`
      }]
    });
    
	}
}
