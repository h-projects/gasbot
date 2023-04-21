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

  const permissions = message.channel.permissionsFor(client.user);
  if (
    message.author.bot ||
    message.author.system ||
    (message.type !== MessageType.Default && message.type !== MessageType.Reply) ||
    !message.content ||
    (permissions && !permissions.has(PermissionFlagsBits.SendMessages))
  ) {
    return;
  }

  return client.detector.detectMessage(message, true);
}
