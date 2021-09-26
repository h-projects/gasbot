const { Client } = require('discord.js');
const Database = require('better-sqlite3');
const client = new Client({
  intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS', 'GUILD_MEMBERS'],
  partials: ['MESSAGE', 'REACTION', 'USER', 'GUILD_MEMBER'],
  allowedMentions: { parse: ['users'], repliedUser: false },
  presence: {
    activities: [{ name: 'ha!help | Removinq G!', type: 'PLAYING' }],
    status: 'dnd'
  }
});

require('dotenv').config();

client.db = new Database('database.sqlite3', { fileMustExist: true });

client.config = require('./config.json');
client.prefix = client.config.prefix;

const { readdirSync } = require('fs');
const loaders = readdirSync('./loaders').filter(file => file.endsWith('.js'));

loaders.forEach(file => {
  require(`./loaders/${file}`)(client);
});


process.on('unhandledRejection', console.error);
process.on('exit', () => client.db.close());
client.login(process.env.DISCORD_TOKEN);
