require('dotenv/config');
const { REST } = require('@discordjs/rest');
const Database = require('better-sqlite3');
const { Client } = require('discord.js');
const { readdirSync } = require('fs');
const { DJSPoster } = require('topgg-autoposter');

const client = new Client({
  intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS', 'GUILD_MEMBERS'],
  partials: ['MESSAGE', 'REACTION', 'USER', 'GUILD_MEMBER'],
  allowedMentions: { parse: ['users'], repliedUser: false },
  presence: {
    activities: [{ name: '/h | Removinq G!', type: 'PLAYING' }],
    status: 'dnd'
  }
});

console.log(`Starting ${process.env.NODE_ENV} build...`);

if (process.env.NODE_ENV !== 'development') {
  // eslint-disable-next-line no-new
  new DJSPoster(process.env.TOPGG_TOKEN, client);
}

client.config = require('./config.json');
client.db = new Database('database.sqlite3', { fileMustExist: true });
client.restModule = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

const loaders = readdirSync('./loaders').filter(file => file.endsWith('.js'));

loaders.forEach(file => {
  require(`./loaders/${file}`)(client);
});


process.on('unhandledRejection', console.error);
process.on('exit', () => client.db.close());
client.login(process.env.DISCORD_TOKEN);
