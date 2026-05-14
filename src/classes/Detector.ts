import { setTimeout } from 'node:timers/promises';
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
import type { Application } from '#classes';
import { database } from '#database';
import { env } from '#env';
import { isSendable } from '#util';

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
  level: Level;
  logs: bigint | null;
  member: GuildMember;
};

export class Detector {
  #client: Application<true>;
  constructor(client: Application) {
    this.#client = client as Application<true>;
  }

  static #getDetectorDataStatement = database.prepare('SELECT level, logs FROM guilds WHERE id = ?');
  fetchDetectorData(guildId: string) {
    const result = Detector.#getDetectorDataStatement.get(BigInt(guildId)) as
      | { level: bigint; logs: bigint | null }
      | undefined;
    return {
      level: result ? Number(result.level) : Level.Medium,
      logs: result?.logs ?? null
    };
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
    const { level, logs } = this.fetchDetectorData(message.guildId);

    if (!detect(message.content, level) || !message.member) {
      return;
    }

    if (message.deletable) {
      await message.delete().catch(() => null);
    }

    this.#count(message.guildId, message.author.id);
    return Promise.all([
      this.reply(message, edited),
      this.#log({
        guildId: message.guildId,
        level,
        logs,
        message,
        member: message.member,
        type: edited ? LogType.EditedMessage : LogType.Message
      })
    ]);
  }

  static nicknameRegExp = RegExp(`[${blocklist.join('')}]`, 'giu');
  static separatorRegExp = /[.\-_ /\\()[\]]/giu;
  async detectNickname(member: GuildMember) {
    const cleanNickname = member.displayName.replaceAll(Detector.separatorRegExp, '');
    const result = Detector.nicknameRegExp.exec(cleanNickname) ?? [];

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
    const newNickname = oldNickname.replaceAll(Detector.nicknameRegExp, 'h');
    await member.setNickname(newNickname).catch(() => null);

    if (member.user.bot) {
      return;
    }

    const { level, logs } = this.fetchDetectorData(member.guild.id);

    this.#count(member.guild.id, member.id);
    return this.#log({ member, level, logs, nickname: oldNickname, type: LogType.Nickname, guildId: member.guild.id });
  }

  async detectReaction(reaction: MessageReaction, user: User) {
    if (!reaction.message.member || !reaction.message.inGuild()) {
      return;
    }

    const member = await reaction.message.guild.members.fetch(user);
    const permissions = reaction.message.channel.permissionsFor(this.#client.user);

    if ((permissions && !permissions.has(PermissionFlagsBits.ManageMessages)) || reaction.emoji.name !== '🇬') {
      return;
    }

    await reaction.remove().catch(() => null);

    if (user.bot) {
      return;
    }

    const { level, logs } = this.fetchDetectorData(member.guild.id);

    this.#count(reaction.message.guild.id, user.id);
    return this.#log({ member, level, logs, reaction, type: LogType.Reaction, guildId: reaction.message.guild.id });
  }

  static #updateGlobalCountStatement = database.prepare('UPDATE global SET count = count + 1');
  static #updateGuildCountStatement = database.prepare(`
    INSERT INTO guilds (id, count) VALUES (?, 1) ON CONFLICT (id) DO
    UPDATE SET count = count + 1
  `);
  static #updateUserCountStatement = database.prepare(`
    INSERT INTO users (id, count) VALUES (?, 1) ON CONFLICT (id) DO
    UPDATE SET count = count + 1
  `);
  #count(guildId: string, userId: string) {
    Detector.#updateGlobalCountStatement.run();
    Detector.#updateGuildCountStatement.run(BigInt(guildId));
    Detector.#updateUserCountStatement.run(BigInt(userId));
  }

  async #log(options: LogOptions): Promise<unknown> {
    const channel = this.#client.channels.cache.get(options.logs?.toString() ?? '') as
      | GuildTextBasedChannel
      | undefined;

    const fields: APIEmbedField[] = [
      {
        name: 'Type',
        value: logTypeNames[options.type],
        inline: true
      },
      { name: 'Level', value: Level[options.level].replace('g', 'q'), inline: true },
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
            color: this.#client.color,
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

    const globalLogs = this.#client.channels.cache.get(env.GLOBAL_DETECTOR_LOGS) as GuildTextBasedChannel;
    return globalLogs.send({
      embeds: [
        {
          title: 'G Removal',
          url: 'https://h-projects.github.io/app/fuck-g/',
          color: this.#client.color,
          fields,
          thumbnail: {
            url: options.member.displayAvatarURL()
          }
        }
      ]
    });
  }
}
