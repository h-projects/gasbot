import type { Application } from '#classes';
import { isSendable } from '#util';
import { type Message, MessageType } from 'discord.js';

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

  const [commandName] = message.content.slice(2).split(' ');
  const command = client.chatInputCommands.get(commandName);

  if (message.content.startsWith('h!') && command && !command.dev && (await isSendable(message.channel))) {
    const commands = client.application.commands.cache.size
      ? client.application.commands.cache
      : await client.application.commands.fetch();
    const command = commands.find(c => c.name === commandName);
    const mention = command ? `</${commandName}:${command.id}>` : `/${commandName}`;

    return message.channel.send(`Prefix-based commands are no lonqer supported, use ${mention} instead!`);
  }

  return client.detector.detectMessage(message, false);
}
