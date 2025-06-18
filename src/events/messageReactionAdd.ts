import type { MessageReaction, User } from 'discord.js';
import type { Application } from '#classes';

export async function run(client: Application<true>, reaction: MessageReaction, user: User) {
  if (reaction.partial) {
    try {
      await reaction.fetch();
    } catch {
      return;
    }
  }

  return client.detector.detectReaction(reaction, user);
}
