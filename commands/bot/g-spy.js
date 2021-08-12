module.exports = {
  name: 'g-spy',
	description: 'Mark an user as a g-spy',
  permissions: ['MANAGE_MESSAGES', 'MANAGE_ROLES'],
  
  async execute(client, message, args) {
    const userId = /\d+/.exec(message.content)?.toString();
    const member = userId ? await message.guild.members.fetch(userId).catch(() => null) : null;
    
    
    if (!member || userId == message.author.id || userId == client.user.id) {
      return message.channel.send({
        embeds: [{
        title: 'Invalid User',
        description: 'You need to mention a valid user!',
        color: client.config.color
        }]
      });
    }
    
    let role = message.guild.roles.cache.find(role => role.name == 'g-spy') ?? await message.guild.roles.create({
      name: 'g-spy',
      reason: 'Found a g-spy',
    });
    
    member.roles.add(role)
    message.channel.send({
      embeds: [{
        title: 'Done',
        description: `${member} was marked as a ${role}`,
        color: client.config.color
      }],
      components: [{
        type: 'ACTION_ROW',
        components: [{
          type: 'BUTTON',
          style: 'SECONDARY',
          label: 'Revert',
          custom_id: `g-spy:${member.id}:${message.author.id}`,
        }]
      }]
    });
    
  }
  
}
