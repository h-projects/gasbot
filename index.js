const { Client } = require('discord.js');
const client = new Client({
  intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS', 'GUILD_MEMBERS'],
  partials: ['MESSAGE', 'REACTION', 'USER', 'GUILD_MEMBER'],
  allowedMentions: { parse: ['users'], repliedUser: false },
  presence: {
    activities: [{ name: 'ha!help | Removinq G!', type: 'PLAYING' }],
    status: 'dnd'
  }
});

const { readdirSync } = require('fs');

client.config = require('./config.json');
client.prefix = client.config.prefix;



const loaders = readdirSync('./loaders').filter(file => file.endsWith('.js'));

loaders.forEach(file => {
  require(`./loaders/${file}`)(client);
});


process.on("unhandledRejection", console.error);
client.login(process.env.DISCORD_TOKEN);
