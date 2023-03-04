import { setTimeout } from 'node:timers/promises';
import type { Application } from '#classes';
import { env } from '#env';
import {
  type APIEmbedField,
  type GuildMember,
  type GuildTextBasedChannel,
  type Message,
  type MessageReaction,
  type User,
  PermissionFlagsBits
} from 'discord.js';
import { blocklist, detect, Level } from 'g-detector';

export enum LogType {
  Message,
  EditedMessage,
  Nickname,
  Reaction
}

export interface MessageLogOptions {
  type: LogType.Message | LogType.EditedMessage;
  guildId: string;
  message: Message<true>;
}

export interface NicknameLogOptions {
  type: LogType.Nickname;
  guildId: string;
}

export interface ReactionLogOptions {
  type: LogType.Reaction;
  guildId: string;
  reaction: MessageReaction;
}

export type LogOptions = (MessageLogOptions | NicknameLogOptions | ReactionLogOptions) & {
  level: Level | null;
  logs: bigint | null;
  member: GuildMember;
};

export class Detector {
  private client: Application;
  constructor(client: Application) {
    this.client = client;
  }

  async fetchDetectorData(guildId: string) {
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
    const clientMember = await message.guild.members.fetchMe();
    if (edited || !message.channel.permissionsFor(clientMember).has(PermissionFlagsBits.SendMessages)) {
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
    const cleanNickname = member.displayName.replace(/[.\-_ /\\()[\]]/giu, '');
    const result = [...cleanNickname.matchAll(Detector.nicknameRegexp)];

    const clientMember = await member.guild.members.fetchMe();
    if (
      result.length / cleanNickname.length < 0.75 ||
      !cleanNickname ||
      !member.manageable ||
      !clientMember.permissions.has(PermissionFlagsBits.ManageNicknames)
    ) {
      return;
    }

    const newNickname = member.displayName.replace(Detector.nicknameRegexp, 'h');
    await member.setNickname(newNickname).catch(() => null);

    if (member.user.bot) {
      return;
    }

    const { level, logs } = await this.fetchDetectorData(member.guild.id);

    return Promise.all([
      this.count(member.guild.id, member.id),
      this.log({ member, level, logs, type: LogType.Nickname, guildId: member.guild.id })
    ]);
  }

  async detectReaction(reaction: MessageReaction, user: User) {
    if (!reaction.message.member || !reaction.message.guild || !('permissionsFor' in reaction.message.channel)) {
      return;
    }

    const member = await reaction.message.guild.members.fetch(user);
    const clientMember = await reaction.message.guild.members.fetchMe();

    if (
      !reaction.message.channel.permissionsFor(clientMember).has(PermissionFlagsBits.ManageMessages) ||
      reaction.emoji.name !== '🇬'
    ) {
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
    const channel = this.client.channels.cache.get(options.logs?.toString() ?? '') as GuildTextBasedChannel;

    const fields: APIEmbedField[] = [
      { name: 'Type', value: LogType[options.type].replace('Edited', 'Edited ').replace('g', 'q'), inline: true },
      { name: 'Level', value: Level[options.level ?? Level.Medium].replace('g', 'q'), inline: true },
      { name: 'User', value: `${options.member} (${options.member.id})` }
    ];

    switch (options.type) {
      case LogType.Message:
      case LogType.EditedMessage:
        const { message } = options;
        const content =
          message.content.length > 1024 ? `${message.content.substring(0, 1021).trimEnd()}...` : message.content;

        fields.push({ name: 'Channel', value: `${message.channel} (${message.channelId})` });
        fields.push({ name: 'Content', value: content });
        break;

      case LogType.Nickname:
        fields.push({ name: 'Nickname', value: options.member.displayName });
        break;

      case LogType.Reaction:
        const { reaction } = options;
        fields.push({ name: 'Channel', value: `${reaction.message.channel} (${reaction.message.channelId})` });
        fields.push({ name: 'Reaction', value: `${reaction.emoji}` });
        break;
    }

    const clientMember = await channel.guild.members.fetchMe();
    if (channel.permissionsFor(clientMember).has(PermissionFlagsBits.SendMessages) && channel.viewable) {
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
