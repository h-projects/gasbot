import type { Application } from '#classes';
import { env } from '#env';
import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  type ButtonInteraction,
  type ChatInputCommandInteraction,
  SlashCommandBuilder
} from 'discord.js';
import Snoowrap from 'snoowrap';

const reddit = new Snoowrap({
  userAgent: 'gasbot',
  clientId: env.REDDIT_CLIENT_ID,
  clientSecret: env.REDDIT_TOKEN,
  refreshToken: env.REDDIT_REFRESH
});

const subreddits = ['memes', 'dankmemes', 'comedynecrophilia', 'theletterh', 'okbuddyretard', '196', 'me_irl'];

export async function onInteraction(client: Application, interaction: ChatInputCommandInteraction | ButtonInteraction) {
  const randomSubreddit = subreddits[Math.floor(Math.random() * subreddits.length)];

  const listing = (await reddit.getHot(randomSubreddit)).filter(
    p => !p.over_18 && p.is_reddit_media_domain && !p.is_video
  );
  const post = listing[Math.floor(Math.random() * listing.length)];

  const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder().setLabel('Refresh').setStyle(ButtonStyle.Secondary).setCustomId(`meme::${interaction.user.id}`)
  );

  const options = {
    embeds: [
      {
        title: post.title.replaceAll('g', 'q').replaceAll('G', 'Q'),
        url: `https://reddit.com${post.permalink}`,
        image: post,
        author: {
          name: post.subreddit_name_prefixed
        },
        footer: {
          text: `u/${post.author.name}`
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
  .setDescription('Displays a extremely funny hilarious meme from Reddit');
