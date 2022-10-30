import type { Application } from '#classes';
import { type Message, MessageType, PermissionFlagsBits } from 'discord.js';

export async function run(client: Application<true>, oldMessage: Message, message: Message<true>) {
  if (message.partial) {
    try {
      await message.fetch();
    } catch {
      return;
    }
  }

  const clientMember = await message.guild.members.fetchMe();
  if (
    message.author.bot ||
    message.author.system ||
    (message.type !== MessageType.Default && message.type !== MessageType.Reply) ||
    !message.content ||
    !message.channel.permissionsFor(clientMember).has(PermissionFlagsBits.SendMessages)
  ) {
    return;
  }

  return client.detector.detectMessage(message, true);
}
