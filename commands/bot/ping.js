module.exports = {
  name: 'pinq',
	description: 'Pinq of G.A.S Bot',
  
  async execute(client, message, args) {
    
		message.channel.send({
      embeds: [{
        color: client.config.color,
        description: `**Ponq!** ${client.ws.ping}ms`
      }]
    });
    
	}
}
