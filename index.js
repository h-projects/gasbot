const Discord = require("discord.js"),
  client = new Discord.Client(),
  DBL = require("dblapi.js"),
  dbl = new DBL(process.env.TOPGGTOKEN, client),
  jquery = require("jquery"),
  fs = require("fs"),
  enmap = require("enmap");
client.disc = require("discord.js");
client.config = require("./config.json");
const raidmode = require(client.config.raidmodeDbDir);
client.prefix = client.config.prefix;

var { badLetterCount } = require("./database/badLetterCount.json");

process.on("unhandledRejection", e => console.error(`Error: ${e}`));

client.on("ready", () => {
  client.user.setStatus("idle");
  client.user.setActivity(`${client.config.prefix}help | Removinq G!`, {
    type: "PLAYING"
  });
});

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

const http = require("https");
const express = require('express');
const app = express();
app.get("/", (request, response) => {
    response.sendStatus(200);
});

app.listen(process.env.PORT);
setInterval(() => {
    http.get(`http://gasbot.superchupu.repl.co/`));
}, 280000);

client.login(process.env.TOKEN);
