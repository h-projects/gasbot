import process from 'node:process';
import { styleText } from 'node:util';
import { PrismaClient } from '@prisma/client';
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
import { Detector } from '#classes';
import { env } from '#env';
import {
  type ChatInputCommand,
  type Command,
  type Component,
  type ContextMenuCommand,
  type Event,
  loadDirectory,
  logger
} from '#util';

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
      logger.log(`Booting up ${styleText(['bold', 'magenta'], 'production')} build...`);
      disableValidators();
    } else {
      logger.log('Booting up...');
    }

    await Promise.all([this.loadEvents(), this.loadCommands(), this.prisma.$connect()]);

    await this.login();

    for (const signal of ['SIGINT', 'SIGTERM']) {
      process.on(signal, () => {
        logger.log(`Received ${styleText('blue', signal)}, shutting down...`);
        void Promise.all([this.destroy(), this.prisma.$disconnect()]);
      });
    }

    process.on('uncaughtException', error => logger.error(error));
  }

  async deployCommands() {
    if (!this.isReady()) {
      throw new Error("Client is not ready, can't deploy commands");
    }

    await this.application.commands.set([
      ...this.chatInputCommands.filter(c => !c.dev).map(c => c.slashCommandData.toJSON()),
      ...this.contextMenuCommands.filter(c => !c.dev).map(c => c.contextMenuCommandData.toJSON())
    ]);

    const testGuild = this.guilds.cache.get(env.TEST_GUILD);
    await testGuild?.commands.set([
      ...this.chatInputCommands.filter(c => c.dev).map(c => c.slashCommandData.toJSON()),
      ...this.contextMenuCommands.filter(c => c.dev).map(c => c.contextMenuCommandData.toJSON())
    ]);

    logger.log('Deployed all commands');
  }

  makeDatabaseBackup() {
    return new AttachmentBuilder('./database.db').setName(`GASBOT-${new Date().toISOString()}.db`);
  }

  async loadEvents() {
    const perf = performance.now();
    const events = await loadDirectory<Event>('../events');
    for (const event of events) {
      this.on(event.name, (...args: unknown[]) => {
        return event.data.run(this, ...args);
      });
    }
    logger.log(`Loaded events [${(performance.now() - perf).toFixed(2)}ms]`);
  }

  async loadCommands() {
    const perf = performance.now();
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
    logger.log(`Loaded commands [${(performance.now() - perf).toFixed(2)}ms]`);
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
