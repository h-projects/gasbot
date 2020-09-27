module.exports = async () => {
  
  client.user.setPresence({
    status: "dnd",
    activity: {
      name: `${client.config.prefix}help | Removinq G!`,
      type: "PLAYING"
    }
  });
  
  console.log("Bot is now H");
  
};
