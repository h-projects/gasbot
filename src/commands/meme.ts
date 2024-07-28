import type { Application } from '#classes';
import {
  ActionRowBuilder,
  ApplicationIntegrationType,
  ButtonBuilder,
  type ButtonInteraction,
  ButtonStyle,
  type ChatInputCommandInteraction,
  InteractionContextType,
  SlashCommandBuilder
} from 'discord.js';

interface RedditResponse {
  data: {
    children: {
      data: {
        author: string;
        created: number;
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

const subreddits = ['memes', 'dankmemes', 'comedynecrophilia', 'theletterh', 'okbuddyretard', '196', 'me_irl'];

export async function onInteraction(client: Application, interaction: ChatInputCommandInteraction | ButtonInteraction) {
  const subreddit = subreddits[Math.floor(Math.random() * subreddits.length)];

  const json = (await fetch(`https://www.reddit.com/r/${subreddit}/hot.json`).then(r => r.json())) as RedditResponse;
  const listing = json.data.children
    .map(c => c.data)
    .filter(p => !p.over_18 && p.is_reddit_media_domain && !p.is_video);

  const post = listing[Math.floor(Math.random() * listing.length)];

  const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder().setLabel('Refresh').setStyle(ButtonStyle.Secondary).setCustomId(`meme::${interaction.user.id}`)
  );

  const options = {
    embeds: [
      {
        title: post.title.replaceAll('g', 'q').replaceAll('G', 'Q'),
        url: `https://reddit.com${post.permalink}`,
        image: {
          url: post.url
        },
        author: {
          name: post.subreddit_name_prefixed
        },
        footer: {
          text: `u/${post.author}`
        },
        timestamp: new Date(post.created * 1000).toISOString(),
        color: client.color
      }
    ],
    components: [row]
  };

  return interaction.isChatInputCommand() ? interaction.reply(options) : interaction.update(options);
}

export const hasComponent = true;

export const slashCommandData = new SlashCommandBuilder()
  .setName('meme')
  .setDescription('Displays a extremely funny hilarious meme from Reddit')
  .setContexts([InteractionContextType.Guild, InteractionContextType.BotDM, InteractionContextType.PrivateChannel])
  .setIntegrationTypes([ApplicationIntegrationType.GuildInstall, ApplicationIntegrationType.UserInstall]);
