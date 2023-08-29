import process from 'node:process';
import { Detector, Logger } from '#classes';
import { env } from '#env';
import {
  type ChatInputCommand,
  type Command,
  type Component,
  type ContextMenuCommand,
  type Event,
  loadDirectory
} from '#util';
import { PrismaClient } from '@prisma/client';
import { DJSPoster } from '@superchupu/topgg-autoposter';
import {
  ActivityType,
  AttachmentBuilder,
  Client,
  Collection,
  Colors,
  disableValidators,
  GatewayIntentBits,
  Partials,
  PresenceUpdateStatus
} from 'discord.js';
import { bold, magenta } from 'yoctocolors';

export class Application<Ready extends boolean = boolean> extends Client<Ready> {
  detector: Detector = new Detector(this);

  chatInputCommands = new Collection<string, ChatInputCommand>();
  contextMenuCommands = new Collection<string, ContextMenuCommand>();
  components = new Collection<string, Component>();

  prisma = new PrismaClient();

  color = Colors.Red;
  developers = ['478823932913516544', '682617926909427743', '348591272476540928'];
  specialThanksUsers = [
    '429935667737264139',
    '444550944110149633',
    '528229753258246145',
    '299921398992994304',
    '692037827940057129',
    '603635602809946113'
  ];

  constructor() {
    super({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.MessageContent
      ],
      partials: [Partials.GuildMember, Partials.Message, Partials.Reaction, Partials.User],
      allowedMentions: { parse: ['users'] },
      presence: {
        activities: [{ name: 'Removinq G!', type: ActivityType.Custom }],
        status: PresenceUpdateStatus.DoNotDisturb
      }
    });
  }

  async initialize() {
    if (env.NODE_ENV === 'production') {
      Logger.log(`Booting up ${bold(magenta('production'))} build...`);
      disableValidators();
    } else {
      Logger.log('Booting up...');
    }

    await Promise.all([this.loadEvents(), this.loadCommands(), this.prisma.$connect()]);

    await this.login();

    if (env.NODE_ENV === 'production' && process.platform === 'linux') {
      new DJSPoster(env.TOPGG_TOKEN, this);
    }

    process.on('uncaughtException', error => Logger.error(error));
  }

  async deployCommands() {
    await this.application?.commands.set([
      ...this.chatInputCommands.filter(c => !c.dev).map(c => c.slashCommandData.toJSON()),
      ...this.contextMenuCommands.filter(c => !c.dev).map(c => c.contextMenuCommandData.toJSON())
    ]);

    const testGuild = this.guilds.cache.get(env.TEST_GUILD);
    await testGuild?.commands.set([
      ...this.chatInputCommands.filter(c => c.dev).map(c => c.slashCommandData.toJSON()),
      ...this.contextMenuCommands.filter(c => c.dev).map(c => c.contextMenuCommandData.toJSON())
    ]);

    Logger.log('Deployed all commands');
  }

  makeDatabaseBackup() {
    return new AttachmentBuilder('./database.db').setName(`GASBOT-${new Date().toISOString()}.db`);
  }

  async loadEvents() {
    const events = await loadDirectory<Event>('../events');
    for (const event of events) {
      this.on(event.name, async (...args: unknown[]) => {
        await event.data.run(this, ...args);
      });
    }
    Logger.log('Loaded events');
  }

  async loadCommands() {
    const commands = await loadDirectory<Command>('../commands');
    for (const command of commands) {
      if (this.isChatInputCommand(command.data)) {
        this.chatInputCommands.set(command.data.slashCommandData.name, command.data);
      }
      if (this.isContextMenuCommand(command.data)) {
        this.contextMenuCommands.set(command.data.contextMenuCommandData.name, command.data);
      }
      if (this.isComponent(command.data)) {
        this.components.set(command.name, command.data);
      }
    }
    Logger.log('Loaded commands');
  }

  isChatInputCommand(command: Command): command is ChatInputCommand {
    return 'slashCommandData' in command;
  }

  isContextMenuCommand(command: Command): command is ContextMenuCommand {
    return 'contextMenuCommandData' in command;
  }

  isComponent(command: Command): command is Component {
    return 'hasComponent' in command;
  }
}
