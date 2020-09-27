module.exports = async () => {
  
  client.user.setPresence({
    activity: {
      name: `${client.config.prefix}help | Removinq G!`,
      type: "PLAYING"
    },
    status: "dnd"
  });
  
  console.log("Bot is now H");
  
};
