import type { GuildMember } from 'discord.js';
import type { Application } from '#classes';

export async function run(client: Application<true>, _oldMember: GuildMember, member: GuildMember) {
  if (member.partial) {
    try {
      await member.fetch();
    } catch {
      return;
    }
  }

  return client.detector.detectNickname(member);
}
