exports.run = (client, message, args) => {
  if (args.join(" ")) return;
  message.channel.send("We will defeat the worst letter in the alphabet");
};
