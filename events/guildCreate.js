module.exports = {
  name: 'guildCreate',
  once: false,
  async execute(guild, client) {
    const channel = client.channels.cache.get(client.config.guildLogs);
    channel.send({
      embeds: [{
        title: `Joined ${guild}`,
        fields: [
          { name: 'ID', value: guild.id },
          { name: 'Owner', value: (await guild.fetchOwner()).user.tag },
          { name: 'Member Count', value: `${guild.memberCount}`, inline: true },
          { name: 'Server Count', value: `${client.guilds.cache.size}`, inline: true }
        ],
        thumbnail: {
          url: guild.iconURL({ dynamic: true })
        },
        color: client.config.color
      }]
    });
  }
};
