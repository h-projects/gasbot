import {
  ApplicationIntegrationType,
  type ButtonInteraction,
  ButtonStyle,
  ChatInputCommandBuilder,
  type ChatInputCommandInteraction,
  ComponentType,
  InteractionContextType,
  type InteractionReplyOptions,
  MessageFlags
} from 'discord.js';
import type { Application } from '#classes';

interface RedditResponse {
  data: {
    children: {
      data: {
        author: string;
        is_reddit_media_domain: boolean;
        is_video: boolean;
        over_18: boolean;
        permalink: string;
        subreddit_name_prefixed: string;
        title: string;
        url: string;
      };
    }[];
  };
}

const subreddits = ['comedynecrophilia', 'theletterh', 'okbuddyretard', '196', 'rustjerk', 'thomastheplankengine'];

export async function onInteraction(client: Application, interaction: ChatInputCommandInteraction | ButtonInteraction) {
  const subreddit = subreddits[Math.floor(Math.random() * subreddits.length)];

  const json = (await fetch(`https://www.reddit.com/r/${subreddit}/hot.json`).then(r => r.json())) as RedditResponse;
  const listing = Iterator.from(json.data.children)
    .filter(p => !p.data.over_18 && p.data.is_reddit_media_domain && !p.data.is_video)
    .map(c => c.data)
    .toArray();

  const post = listing[Math.floor(Math.random() * listing.length)];

  const options = {
    flags: MessageFlags.IsComponentsV2,
    components: [
      {
        type: ComponentType.Container,
        accentColor: client.color,
        components: [
          {
            type: ComponentType.TextDisplay,
            content: `## [${post.title.replaceAll('g', 'q').replaceAll('G', 'Q')}](https://reddit.com${post.permalink})`
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
                content: `-# ${post.subreddit_name_prefixed} • u/${post.author}`
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
