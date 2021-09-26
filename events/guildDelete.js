module.exports = {
  name: 'guildDelete',
  once: false,
  async execute(guild, client) {
    if (guild.deleted) {
      return;
    }
    const channel = client.channels.cache.get(client.config.guildLogs);
    channel.send({
      embeds: [{
        title: `Left ${guild}`,
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
