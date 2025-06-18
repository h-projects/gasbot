import type {
  ChatInputCommandInteraction,
  CommandInteraction,
  ContextMenuCommandBuilder,
  ContextMenuCommandInteraction,
  Interaction,
  MessageComponentInteraction,
  PermissionResolvable,
  SlashCommandBuilder
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
  onSlashCommand(client: Application, interaction: ChatInputCommandInteraction): Promise<void>;
  onContextMenuCommand(client: Application, interaction: ContextMenuCommandInteraction): Promise<void>;
  onComponent(client: Application, interaction: MessageComponentInteraction, value?: string): Promise<void>;
  slashCommandData: SlashCommandBuilder;
  contextMenuCommandData: ContextMenuCommandBuilder;
}

export type Command = Partial<BaseCommand>;

export type ChatInputCommand = Pick<BaseCommand, 'slashCommandData'> & Command;
export type ContextMenuCommand = Pick<BaseCommand, 'contextMenuCommandData'> & Command;

export type Component = Pick<BaseCommand, 'hasComponent'> & Command;
