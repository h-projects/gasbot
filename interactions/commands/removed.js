module.exports = {
  name: 'removed',
  contextMenu: 'Removed Count',
  async execute(client, interaction) {
    const member = interaction.options.getMember('user') ?? interaction.member;
    const user = interaction.options.getUser('user');

    if (!member && user || member.user.bot) {
      return interaction.reply({
        embeds: [{
        title: 'Invalid User',
        description: 'You need to mention a valid user!',
        color: client.config.color
        }],
        ephemeral: true
      });
    }

    const { count } = client.db.prepare('SELECT count FROM global_data').get();
    const userCount = client.db.prepare('SELECT count FROM users WHERE id = ?').get(member.id)?.count ?? 0;
    const guildCount = client.db.prepare('SELECT count FROM guilds WHERE id = ?').get(interaction.guildId)?.count ?? 0;

    interaction.reply({
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
