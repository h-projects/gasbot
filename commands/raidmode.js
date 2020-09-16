const fs = require("fs");
const db = require("../database/raidmode.json");

exports.run = (client, message, args) => {
  if (client.disc.member.hasPermission("ADMINSTRATOR")) {
    return;
  } else
    return message.reply(
      {
        embed: {
          color: 15158332,
          title: '403 Forbidden',
          description: 'You do not have permission to use that command!'
        }
      }
    );
  //   this would prob add the server id to the json and also remove it
};
