import {
  ApplicationIntegrationType,
  ChatInputCommandBuilder,
  type ChatInputCommandInteraction,
  InteractionContextType
} from 'discord.js';
import type { Application } from '#classes';

export function onChatInputCommand(client: Application, interaction: ChatInputCommandInteraction) {
  return interaction.reply({
    embeds: [
      {
        title: 'huh',
        image: {
          url: 'https://cdn.discordapp.com/emojis/805862278766395483.png?size=4096&quality=lossless'
        },
        color: client.color
      }
    ]
  });
}

export const chatInputCommandData = new ChatInputCommandBuilder()
  .setName('huh')
  .setDescription(':thinkinq_h:')
  .setContexts([InteractionContextType.Guild, InteractionContextType.BotDM, InteractionContextType.PrivateChannel])
  .setIntegrationTypes([ApplicationIntegrationType.GuildInstall, ApplicationIntegrationType.UserInstall])
  .toJSON();
