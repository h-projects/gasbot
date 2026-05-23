import { ChatInputCommandBuilder } from '@discordjs/builders';
import {
  ApplicationIntegrationType,
  type ButtonInteraction,
  ButtonStyle,
  type ChatInputCommandInteraction,
  ComponentType,
  InteractionContextType,
  type InteractionReplyOptions,
  MessageFlags
} from 'discord.js';
import type { Application } from '#classes';

interface RedditResponse {
  memes: {
    postLink: string;
    subreddit: string;
    title: string;
    url: string;
    author: string;
  }[];
}

const subreddits = ['comedynecrophilia', 'theletterh', 'okbuddyretard', '196', 'rustjerk', 'thomastheplankengine'];

export async function onInteraction(client: Application, interaction: ChatInputCommandInteraction | ButtonInteraction) {
  const subreddit = subreddits[Math.floor(Math.random() * subreddits.length)];

  const response = await fetch(`https://meme-api.com/gimme/${subreddit}/1`);

  if (!response.ok) {
    console.warn(`Error getting Reddit posts, status code ${response.status}`);
    return interaction.reply({
      content:
        'Reddit returned an error ☹️ if this problem persists [open an issue here](<https://github.com/h-projects/gasbot/issues/new>)',
      flags: MessageFlags.Ephemeral
    });
  }

  const json = (await response.json()) as RedditResponse;
  const post = json.memes[0];

  const options = {
    flags: MessageFlags.IsComponentsV2,
    components: [
      {
        type: ComponentType.Container,
        accentColor: client.color,
        components: [
          {
            type: ComponentType.TextDisplay,
            content: `## ${post.title.replaceAll('g', 'q').replaceAll('G', 'Q')}`
          },
          {
            type: ComponentType.MediaGallery,
            items: [{ media: { url: post.url } }]
          },
          {
            type: ComponentType.Section,
            components: [
              {
                type: ComponentType.TextDisplay,
                content: `-# r/${post.subreddit} • u/${post.author} • [permalink](<${post.postLink}>)`
              }
            ],
            accessory: {
              type: ComponentType.Button,
              style: ButtonStyle.Secondary,
              customId: `meme::${interaction.user.id}`,
              label: 'Refresh'
            }
          }
        ]
      }
    ]
  } satisfies InteractionReplyOptions;

  return interaction.isChatInputCommand() ? interaction.reply(options) : interaction.update(options);
}

export const hasComponent = true;

export const chatInputCommandData = new ChatInputCommandBuilder()
  .setName('meme')
  .setDescription('Displays a extremely funny hilarious meme from Reddit')
  .setContexts([InteractionContextType.Guild, InteractionContextType.BotDM, InteractionContextType.PrivateChannel])
  .setIntegrationTypes([ApplicationIntegrationType.GuildInstall, ApplicationIntegrationType.UserInstall])
  .toJSON();
