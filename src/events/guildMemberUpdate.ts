import type { Application } from '#classes';
import type { GuildMember } from 'discord.js';

export async function run(client: Application<true>, oldMember: GuildMember, member: GuildMember) {
  if (member.partial) {
    try {
      await member.fetch();
    } catch {
      return;
    }
  }

  return client.detector.detectNickname(member);
}
