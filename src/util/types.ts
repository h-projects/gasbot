import type {
  ChatInputCommandInteraction,
  CommandInteraction,
  ContextMenuCommandInteraction,
  Interaction,
  MessageComponentInteraction,
  PermissionResolvable,
  RESTPostAPIChatInputApplicationCommandsJSONBody,
  RESTPostAPIContextMenuApplicationCommandsJSONBody
} from 'discord.js';
import type { Application } from '#classes';

export interface Event {
  run(client: Application, ...args: unknown[]): Promise<void>;
}

interface BaseCommand {
  appPermissions?: PermissionResolvable[];
  hasComponent: boolean;
  dev?: boolean;
  onInteraction(client: Application, interaction: Interaction, value?: string): Promise<void>;
  onCommand(client: Application, interaction: CommandInteraction): Promise<void>;
  onChatInputCommand(client: Application, interaction: ChatInputCommandInteraction): Promise<void>;
  onContextMenuCommand(client: Application, interaction: ContextMenuCommandInteraction): Promise<void>;
  onComponent(client: Application, interaction: MessageComponentInteraction, value?: string): Promise<void>;
  chatInputCommandData: RESTPostAPIChatInputApplicationCommandsJSONBody;
  contextMenuCommandData: RESTPostAPIContextMenuApplicationCommandsJSONBody;
}

export type Command = Partial<BaseCommand>;

export type ChatInputCommand = Pick<BaseCommand, 'chatInputCommandData'> & Command;
export type ContextMenuCommand = Pick<BaseCommand, 'contextMenuCommandData'> & Command;

export type Component = Pick<BaseCommand, 'hasComponent'> & Command;
