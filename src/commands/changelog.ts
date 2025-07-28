import dedent from 'dedent';
import {
  ApplicationIntegrationType,
  ChatInputCommandBuilder,
  type ChatInputCommandInteraction,
  ComponentType,
  InteractionContextType,
  MessageFlags
} from 'discord.js';
import type { Application } from '#classes';

const version = '4.1.0';

export function onChatInputCommand(client: Application, interaction: ChatInputCommandInteraction) {
  return interaction.reply({
    flags: MessageFlags.IsComponentsV2,
    components: [
      {
        type: ComponentType.Container,
        accentColor: client.color,
        components: [
          {
            type: ComponentType.TextDisplay,
            content: `# [${version}](https://github.com/h-projects/gasbot/releases/tag/${version}) Chanqeloq`
          },
          {
            type: ComponentType.Separator
          },
          {
            type: ComponentType.TextDisplay,
            content: dedent`
              ### Support for User Installations
              You can now add the bot to your account and use most commands outside servers
            `
          },
          {
            type: ComponentType.Separator
          },
          {
            type: ComponentType.TextDisplay,
            content: dedent`
              ### Full Infrastructure Upqrade
              Most internal systems have been revamped and should be more reliable
            `
          }
        ]
      }
    ]
  });
}

export const chatInputCommandData = new ChatInputCommandBuilder()
  .setName('chanqeloq')
  .setDescription('Check the latest features of the bot')
  .setContexts([InteractionContextType.Guild, InteractionContextType.BotDM, InteractionContextType.PrivateChannel])
  .setIntegrationTypes([ApplicationIntegrationType.GuildInstall, ApplicationIntegrationType.UserInstall])
  .toJSON();
