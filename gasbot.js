const Discord = require("discord.js"),
  client = new Discord.Client({
    ws: {
      intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS', 'GUILD_MEMBERS']
    },
    partials: ['MESSAGE', 'REACTION', 'USER', 'GUILD_MEMBER'],
    disableMentions: 'all',
    presence: {
      activity: { name: "h!help | Removinq G!", type: "PLAYING" },
      status: "dnd"
    }
  }),
  DBL = require("dblapi.js"),
  jquery = require("jquery"),
  fs = require("fs-extra"),
  enmap = require("enmap");
client.disc = require("discord.js");
client.config = require("./database/config.json");
const dbl = new DBL(client.config.TOPGGTOKEN, client);
client.raidmode = require(client.config.raidmodeDbDir);
client.prefix = client.config.prefix;
client.badLetterCount = require("./database/badLetterCount.json");
client.badLetterUser = require("./database/badLetterUser.json");
client.badLetterGuild = require("./database/badLetterGuild.json");
client.statuses = [
  "Removinq G!",
  "Don't use the bad letter",
  "H Clicker",
  "Removed " + client.badLetterCount.badLetterCount + " G's so far"
];

process.on("unhandledRejection", e => console.error(`Error: ${e}`));

fs.readdir("./actions/", (err, files) => {
  console.log("Loading actions...");
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./actions/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
  });
  console.log("Loaded actions!");
});

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

client.login(client.config.token);
