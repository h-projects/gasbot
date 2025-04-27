import { setTimeout } from 'node:timers/promises';
import type { Application } from '#classes';
import { env } from '#env';
import { isSendable } from '#util';
import {
  type APIEmbedField,
  type GuildMember,
  type GuildTextBasedChannel,
  type Message,
  type MessageReaction,
  PermissionFlagsBits,
  type User
} from 'discord.js';
import { blocklist, detect, Level } from 'g-detector';

export const LogType = {
  Message: 0,
  EditedMessage: 1,
  Nickname: 2,
  Reaction: 3
} as const;

const logTypeNames = ['Messaqe', 'Edited Messaqe', 'Nickname', 'Reaction'] as const;

export interface MessageLogOptions {
  type: typeof LogType.Message | typeof LogType.EditedMessage;
  message: Message<true>;
}

export interface NicknameLogOptions {
  type: typeof LogType.Nickname;
  nickname: string;
}

export interface ReactionLogOptions {
  type: typeof LogType.Reaction;
  reaction: MessageReaction;
}

export type LogOptions = (MessageLogOptions | NicknameLogOptions | ReactionLogOptions) & {
  guildId: string;
  level: Level | null;
  logs: bigint | null;
  member: GuildMember;
};

export class Detector {
  private client: Application<true>;
  constructor(client: Application) {
    this.client = client as Application<true>;
  }

  fetchDetectorData(guildId: string) {
    return this.client.prisma.guild.upsert({
      select: {
        level: true,
        logs: true
      },
      where: {
        id: BigInt(guildId)
      },
      update: {},
      create: {
        id: BigInt(guildId)
      }
    });
  }

  async reply(message: Message<true>, edited: boolean) {
    const sendable = await isSendable(message.channel);
    if (edited || !sendable) {
      return;
    }

    const response = await message.channel.send(`${message.author}, don't use the bad letter!`);
    void setTimeout(4000).then(() => response.delete().catch(() => null));
  }

  async detectMessage(message: Message<true>, edited: boolean) {
    const { level, logs } = await this.fetchDetectorData(message.guildId);

    if (!detect(message.content, level ?? Level.Medium) || !message.member) {
      return;
    }

    if (message.deletable) {
      await message.delete().catch(() => null);
    }

    return Promise.all([
      this.reply(message, edited),
      this.count(message.guildId, message.author.id),
      this.log({
        guildId: message.guildId,
        level,
        logs,
        message,
        member: message.member,
        type: edited ? LogType.EditedMessage : LogType.Message
      })
    ]);
  }

  static nicknameRegexp = RegExp(`[${blocklist}]`, 'giu');
  async detectNickname(member: GuildMember) {
    const cleanNickname = member.displayName.replaceAll(/[.\-_ /\\()[\]]/giu, '');
    const result = Detector.nicknameRegexp.exec(cleanNickname) ?? [];

    const clientMember = await member.guild.members.fetchMe();
    if (
      result.length / cleanNickname.length < 0.75 ||
      !cleanNickname ||
      !member.manageable ||
      !clientMember.permissions.has(PermissionFlagsBits.ManageNicknames)
    ) {
      return;
    }

    const oldNickname = member.displayName;
    const newNickname = oldNickname.replaceAll(Detector.nicknameRegexp, 'h');
    await member.setNickname(newNickname).catch(() => null);

    if (member.user.bot) {
      return;
    }

    const { level, logs } = await this.fetchDetectorData(member.guild.id);

    return Promise.all([
      this.count(member.guild.id, member.id),
      this.log({ member, level, logs, nickname: oldNickname, type: LogType.Nickname, guildId: member.guild.id })
    ]);
  }

  async detectReaction(reaction: MessageReaction, user: User) {
    if (!reaction.message.member || !reaction.message.inGuild()) {
      return;
    }

    const member = await reaction.message.guild.members.fetch(user);
    const permissions = reaction.message.channel.permissionsFor(this.client.user);

    if ((permissions && !permissions.has(PermissionFlagsBits.ManageMessages)) || reaction.emoji.name !== '🇬') {
      return;
    }

    await reaction.remove().catch(() => null);

    if (user.bot) {
      return;
    }

    const { level, logs } = await this.fetchDetectorData(member.guild.id);

    return Promise.all([
      this.count(reaction.message.guild.id, user.id),
      this.log({ member, level, logs, reaction, type: LogType.Reaction, guildId: reaction.message.guild.id })
    ]);
  }

  private async count(guildId: string, userId: string): Promise<void> {
    await this.client.prisma.global.update({
      where: {
        id: 0
      },
      data: {
        count: {
          increment: 1
        }
      }
    });
    await this.client.prisma.guild.update({
      where: {
        id: BigInt(guildId)
      },
      data: {
        count: {
          increment: 1
        }
      }
    });
    await this.client.prisma.user.upsert({
      where: {
        id: BigInt(userId)
      },
      update: {
        count: {
          increment: 1
        }
      },
      create: {
        id: BigInt(userId),
        count: 1
      }
    });
  }

  private async log(options: LogOptions): Promise<unknown> {
    const channel = this.client.channels.cache.get(options.logs?.toString() ?? '') as GuildTextBasedChannel | undefined;

    const fields: APIEmbedField[] = [
      {
        name: 'Type',
        value: logTypeNames[options.type],
        inline: true
      },
      { name: 'Level', value: Level[options.level ?? Level.Medium].replace('g', 'q'), inline: true },
      { name: 'User', value: `${options.member} (${options.member.id})` }
    ];

    switch (options.type) {
      case LogType.Message:
      case LogType.EditedMessage: {
        const { message } = options;
        const content =
          message.content.length > 1024 ? `${message.content.substring(0, 1021).trimEnd()}...` : message.content;

        fields.push({ name: 'Channel', value: `${message.channel} (${message.channelId})` });
        fields.push({ name: 'Content', value: content });
        break;
      }

      case LogType.Nickname: {
        fields.push({ name: 'Nickname', value: options.nickname });
        break;
      }

      case LogType.Reaction: {
        const { reaction } = options;
        fields.push({ name: 'Channel', value: `${reaction.message.channel} (${reaction.message.channelId})` });
        fields.push({ name: 'Reaction', value: `${reaction.emoji}` });
        break;
      }
    }

    if (channel && (await isSendable(channel))) {
      await channel.send({
        embeds: [
          {
            title: 'G Removal',
            url: 'https://h-projects.github.io/app/fuck-g/',
            color: this.client.color,
            fields,
            thumbnail: {
              url: options.member.displayAvatarURL()
            }
          }
        ]
      });
    }

    if (options.logs?.toString() === env.GLOBAL_DETECTOR_LOGS || env.NODE_ENV === 'development') {
      return;
    }

    fields.splice(2, 0, { name: 'Server', value: `${options.member.guild} (${options.guildId})` });

    const globalLogs = this.client.channels.cache.get(env.GLOBAL_DETECTOR_LOGS) as GuildTextBasedChannel;
    return globalLogs.send({
      embeds: [
        {
          title: 'G Removal',
          url: 'https://h-projects.github.io/app/fuck-g/',
          color: this.client.color,
          fields,
          thumbnail: {
            url: options.member.displayAvatarURL()
          }
        }
      ]
    });
  }
}
