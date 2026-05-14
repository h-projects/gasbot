import { type Message, MessageType } from 'discord.js';
import type { Application } from '#classes';
import { isSendable } from '#util';

export async function run(client: Application<true>, message: Message<true>) {
  if (
    message.author.bot ||
    message.author.system ||
    (message.type !== MessageType.Default && message.type !== MessageType.Reply) ||
    !message.content
  ) {
    return;
  }

  if (message.content === `<@${client.user.id}>` && (await isSendable(message.channel))) {
    return message.channel.send('Hi! Type `/` to see my commands');
  }

  return client.detector.detectMessage(message, false);
}
