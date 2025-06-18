import { type Message, MessageType } from 'discord.js';
import type { Application } from '#classes';

export async function run(client: Application<true>, _oldMessage: Message, message: Message<true>) {
  if (message.partial) {
    try {
      await message.fetch();
    } catch {
      return;
    }
  }

  if (
    message.author.bot ||
    message.author.system ||
    (message.type !== MessageType.Default && message.type !== MessageType.Reply) ||
    !message.content
  ) {
    return;
  }

  return client.detector.detectMessage(message, true);
}
