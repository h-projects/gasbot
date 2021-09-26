const snoo = require('snoowrap');

const r = new snoo({
    userAgent: 'G.A.S-Bot<Next>',
    clientId: '49z0Xcek_8DeB8LyDjsjyA',
    clientSecret: process.env.REDDIT_TOKEN,
    refreshToken: process.env.REDDIT_REFRESH
})

module.exports = {
    name: 'meme',
    description: 'Shows you a meme!',

    async execute(client, message, args) {
        const memeReddits = ['memes', 'dankmemes', 'comedynecrophilia', 'theletterh', 'okbuddyretard', '196', 'comedyheaven'];
        const sourceReddit = memeReddits[Math.floor(Math.random()*memeReddits.length)]

        const post = r.getHot(sourceReddit);
        console.log(post)

        message.channel.send({ embeds: [{
            title: 'this is supposed to be real',
            description: sourceReddit,
            color: client.config.color
        }]});
    }
}