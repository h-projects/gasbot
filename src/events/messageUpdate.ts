import { type Message, MessageType, type PartialMessage } from 'discord.js';
import type { Application } from '#classes';

export function run(
  client: Application<true>,
  oldMessage: PartialMessage<true> | Message<true>,
  message: Message<true>
) {
  if (
    message.author.bot ||
    message.author.system ||
    (message.type !== MessageType.Default && message.type !== MessageType.Reply) ||
    !message.content ||
    oldMessage.content === message.content
  ) {
    return;
  }

  return client.detector.detectMessage(message, true);
}
