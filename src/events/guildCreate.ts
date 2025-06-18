import type { Guild, GuildTextBasedChannel } from 'discord.js';
import type { Application } from '#classes';
import { env } from '#env';

export async function run(client: Application<true>, guild: Guild) {
  if (!guild.available) {
    return;
  }
  const channel = client.channels.cache.get(env.GUILD_LOGS) as GuildTextBasedChannel;
  return channel.send({
    embeds: [
      {
        title: `Joined ${guild}`,
        fields: [
          { name: 'ID', value: guild.id },
          { name: 'Owner', value: (await guild.fetchOwner()).user.tag },
          { name: 'Member Count', value: `${guild.memberCount}`, inline: true },
          { name: 'Server Count', value: `${client.guilds.cache.size}`, inline: true }
        ],
        thumbnail: {
          url: guild.iconURL() ?? ''
        },
        color: client.color
      }
    ]
  });
}
