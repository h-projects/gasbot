module.exports = {
  name: 'removed',
  description: 'Check how many bad letters were removed',
  async execute(client, message) {
    const userId = /\d+/u.exec(message.content)?.toString();
    const member = userId ? await message.guild.members.fetch(userId).catch(() => null) ?? message.member : message.member;

    if (member.user.bot) {
      return message.channel.send({
        embeds: [{
          title: 'Invalid User',
          description: 'You need to mention a valid user!',
          color: client.config.color
        }]
      });
    }

    const { count } = client.db.prepare('SELECT count FROM global_data').get();
    const userCount = client.db.prepare('SELECT count FROM users WHERE id = ?').get(member.id)?.count ?? 0;
    const guildCount = client.db.prepare('SELECT count FROM guilds WHERE id = ?').get(message.guildId)?.count ?? 0;

    message.channel.send({
      embeds: [{
        title: 'Bad Letters Removed',
        color: client.config.color,
        description: `Removed ${count} bad letters in total`,
        fields: [
          { name: 'Server', value: `Removed ${guildCount} bad letters in this server` },
          { name: 'User', value: `Removed ${userCount} bad letters from ${member}` }
        ]
      }]
    });
  }
};
