import { type GuildTextBasedChannel, PermissionFlagsBits } from 'discord.js';

export async function isSendable(channel: GuildTextBasedChannel) {
  if (channel.isThread()) {
    return channel.sendable;
  }

  const permissions = channel.permissionsFor(channel.client.user);

  if (!permissions || !channel.viewable) {
    return false;
  }

  if (permissions.has(PermissionFlagsBits.Administrator, false)) {
    return true;
  }

  const clientMember = await channel.guild.members.fetchMe();
  return permissions.has(PermissionFlagsBits.SendMessages, false) && !clientMember.isCommunicationDisabled();
}
