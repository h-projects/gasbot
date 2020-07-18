exports.run = (client, message, args) => {
    if (args.join(" ")) return;
    message.channel.send("beans");
};