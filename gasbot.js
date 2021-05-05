// Setup Discord Client
const Discord = require("discord.js");
const client = new Discord.Client({
    ws: {
      intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS', 'GUILD_MEMBERS']
    },
    partials: ['MESSAGE', 'REACTION', 'USER', 'GUILD_MEMBER'],
    disableMentions: 'all',
    presence: {
      activity: { name: "h!help | Removinq G!", type: "PLAYING" },
      status: "dnd"
    }
 });

// Config related requires
client.disc = require("discord.js");
client.config = require("./database/config.json");
client.prefix = require("./database/prefix.json");

// Setup external libraries
const DBL = require("dblapi.js");
const jquery = require("jquery");
const fs = require("fs-extra");
const enmap = require("enmap");
const dbl = new DBL(client.config.TOPGGTOKEN, client);

// Database related requires
client.raidmode = require("./database/raidmode.json");
client.loqs = require("./database/loqs.json");
client.badLetterCount = require("./database/badLetterCount.json");
client.badLetterUser = require("./database/badLetterUser.json");  // TODO: improve this
client.badLetterGuild = require("./database/badLetterGuild.json");
client.restartID = require("./database/restart.json");

// Load actions
fs.readdir("./actions/", (err, files) => {
  console.log("Loading actions...");

  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    const event = require(`./actions/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
  });

  console.log("Loaded actions!");
});

// Load commands
client.cmds = new enmap();
fs.readdir("./commands/", (err, files) => {
  console.log("Loading commands...");

  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    client.cmds.set(commandName, props);
  });

  console.log("Loaded commands!");
});

// Error handlinq + loqqinq in
process.on("unhandledRejection", e => console.error(`Error: ${e}`));
client.login(client.config.token);
