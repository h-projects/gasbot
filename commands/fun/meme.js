const { SlashCommandBuilder } = require('@discordjs/builders');
const Snoowrap = require('snoowrap');
const reddit = new Snoowrap({
  userAgent: 'gasbot',
  clientId: process.env.REDDIT_CLIENT_ID,
  clientSecret: process.env.REDDIT_TOKEN,
  refreshToken: process.env.REDDIT_REFRESH
});

module.exports = {
  async execute(client, interaction) {
    const subreddits = ['memes', 'dankmemes', 'comedynecrophilia', 'theletterh', 'okbuddyretard', '196', 'me_irl'];
    const randomSubreddit = subreddits[Math.floor(Math.random() * subreddits.length)];

    const listing = (await reddit.getHot(randomSubreddit)).filter(p => !p.over_18 && p.is_reddit_media_domain && !p.is_video);
    const post = listing[Math.floor(Math.random() * listing.length)];

    interaction.reply({
      embeds: [{
        title: post.title.replaceAll('g', 'q').replaceAll('G', 'Q'),
        url: `https://reddit.com${post.permalink}`,
        image: post.preview.images[0].variants.gif?.source ?? post.preview.images[0].source,
        author: {
          name: post.subreddit_name_prefixed
        },
        footer: {
          text: `u/${post.author.name}`
        },
        timestamp: post.created * 1000,
        color: client.config.color
      }],
      components: [{
        type: 'ACTION_ROW',
        components: [{
          type: 'BUTTON',
          style: 'SECONDARY',
          label: 'Refresh',
          customId: `meme::${interaction.user.id}`
        }]
      }]
    });
  },

  data: new SlashCommandBuilder()
    .setName('meme')
    .setDescription('Displays a extremely funny hilarious meme from Reddit')
};
