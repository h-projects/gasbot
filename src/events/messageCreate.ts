import type { Application } from '#classes';
import { type Message, MessageType, PermissionFlagsBits } from 'discord.js';

export async function run(client: Application<true>, message: Message<true>) {
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

  if (message.content === `<@${clientMember.user.id}>`) {
    return message.channel.send('Hi! Type `/` to see my commands');
  }

  const [commandName] = message.content.slice(2).split(' ');
  const command = client.chatInputCommands.get(commandName);

  if (message.content.startsWith('h!') && command && !command.dev) {
    const commands = client.application.commands.cache.size
      ? client.application.commands.cache
      : await client.application.commands.fetch();
    const command = commands.find(c => c.name === commandName);
    const mention = command ? `</${commandName}:${command.id}>` : `/${commandName}`;

    return message.channel.send(`Prefix-based commands are no lonqer supported, use ${mention} instead!`);
  }

  return client.detector.detectMessage(message, false);
}
