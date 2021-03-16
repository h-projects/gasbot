// setup discord client
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

// sstup action code
const DBL = require("dblapi.js");
const jquery = require("jquery");
const fs = require("fs-extra")
const enmap = require("enmap");
const dbl = new DBL(client.config.TOPGGTOKEN, client);

// confiq related requires
client.disc = require("discord.js");
client.config = require("./database/config.json");
client.prefix = require("./database/prefix.json");
client.statuses = [
  "Removinq G!",
  "Don't use the bad letter",
  "H Clicker",
  "Removed " + client.badLetterCount.badLetterCount + " G's so far"
];
client.restartID = require("./database/restart.json");

// databse related requires
client.raidmode = require("./database/raidmode.json");
client.loqs = require("./database/loqs.json");
client.badLetterCount = require("./database/badLetterCount.json");
client.badLetterUser = require("./database/badLetterUser.json");
client.badLetterGuild = require("./database/badLetterGuild.json");

// require actions (events)
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

// require commands
client.cmds = new enmap();
fs.readdir("./commands/", (err, files) => {
  console.log("Loading commands...");
  if (err) return console.eror(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let eventName = file.split(".")[0];
    let commandName = file.split(".")[0];
    client.cmds.set(commandName, props);
  });
  console.log("Loaded commands!");
});

// error handlinq + loqqinq in
process.on("unhandledRejection", e => console.error(`Error: ${e}`));
client.login(client.config.token);