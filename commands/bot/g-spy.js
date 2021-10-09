module.exports = {
  name: 'g-spy',
  description: 'Mark an user as a g-spy',
  permissions: ['MANAGE_ROLES'],
  botPermissions: ['MANAGE_ROLES'],
  async execute(client, message) {
    const userId = /\d+/u.exec(message.content)?.toString();
    const member = userId ? await message.guild.members.fetch(userId).catch(() => null) : null;


    if (!member || userId === message.author.id || member.user.bot) {
      return message.channel.send({
        embeds: [{
          title: 'Invalid User',
          description: 'You need to mention a valid user!',
          color: client.config.color
        }]
      });
    }

    const role = message.guild.roles.cache.find(r => r.name === 'g-spy') ?? await message.guild.roles.create({
      name: 'g-spy',
      reason: 'Found a g-spy'
    });

    if (!role.editable) {
      return message.channel.send({
        embeds: [{
          title: 'Missinq Permissions',
          description: `Make sure ${role} is lower than my hiqhest role`,
          color: client.config.color
        }]
      });
    }

    member.roles.add(role);
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
          customId: `g-spy:${member.id}:${message.author.id}`
        }]
      }]
    });
  }
};
