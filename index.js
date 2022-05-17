require('dotenv/config');
const { readdirSync } = require('fs');
const { Client } = require('discord.js');
const Database = require('better-sqlite3');
const { DJSPoster } = require('topgg-autoposter');
const client = new Client({
  intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS', 'GUILD_MEMBERS'],
  partials: ['MESSAGE', 'REACTION', 'USER', 'GUILD_MEMBER'],
  allowedMentions: { parse: ['users'], repliedUser: false },
  presence: {
    activities: [{ name: '/help | Removinq G!', type: 'PLAYING' }],
    status: 'dnd'
  }
});

console.log(`Starting ${process.env.NODE_ENV} build...`);

if (process.env.NODE_ENV !== 'development') {
  // eslint-disable-next-line no-new
  new DJSPoster(process.env.TOPGG_TOKEN, client);
}

client.db = new Database('database.sqlite3', { fileMustExist: true });
client.config = require('./config.json');

const loaders = readdirSync('./loaders').filter(file => file.endsWith('.js'));

loaders.forEach(file => {
  require(`./loaders/${file}`)(client);
});


process.on('unhandledRejection', console.error);
process.on('exit', () => client.db.close());
client.login(process.env.DISCORD_TOKEN);
