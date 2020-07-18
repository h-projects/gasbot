module.exports = async (client, message, member) => {
  var array = message.content.split(" "),
    args = array.slice(1);

  const raidmode = require("../database/raidmode.json");

  // Go aways bots and people who are trying to use commands on dm
  if (message.author.bot || message.channel.type !== "text") return;

  // G Detector™
  let upperCaseMsg = message.content.toUpperCase();

  if (
    upperCaseMsg.includes("NO G") ||
    upperCaseMsg.includes("G SPY") ||
    upperCaseMsg.includes("G-SPY") ||
    upperCaseMsg.includes("G SHOULD NOT EXIST") ||
    upperCaseMsg.includes("FUCK G") ||
    upperCaseMsg.includes("G IS BAD") ||
    upperCaseMsg.includes("G BAD") ||
    upperCaseMsg.includes("G IS SHIT") ||
    upperCaseMsg.includes("HATE G") ||
    upperCaseMsg.includes("WHY DOES G EXIST") ||
    upperCaseMsg.includes("LEFT ME THE LETTER G HAS")
  ) {
    return;
  } else {
    if (
      upperCaseMsg.includes("FUCK H ") ||
      upperCaseMsg.includes(" G ") ||
      upperCaseMsg.includes("`G`") ||
      upperCaseMsg.includes("*G*") ||
      upperCaseMsg.includes("-G-") ||
      upperCaseMsg.includes(" GGG ") ||
      upperCaseMsg.includes("‍G") ||
      upperCaseMsg.includes("G‍") ||
      upperCaseMsg.startsWith("G ") ||
      upperCaseMsg.endsWith(" G") ||
      upperCaseMsg.includes("Ğ") ||
      upperCaseMsg.includes("Ｇ") ||
      upperCaseMsg.includes("🇬") || // this is bad letter emoji
      upperCaseMsg === "G" ||
      upperCaseMsg === "FUCK H" || //:o we should add the regrex
      upperCaseMsg === "GG" ||
      upperCaseMsg.includes("H IS BAD")
    ) {
      message.delete();

      let logEmbed = new client.disc.MessageEmbed()
        .setFooter("G.A.S Bot", `${client.config.botLogo}`)
        .setAuthor(
          "G.A.S Bot",
          `${client.config.botLogo}`,
          `${client.config.botLogo}`
        )
        .setURL("https://h-projects.github.io/fuck-g/")
        .setTimestamp()
        .setColor("E74C3C")
        .setTitle("G Removal")
        .addField("User", `${message.author.tag} (${message.author.id})`)
        .addField("Server", `${message.guild.name} (${message.guild.id})`)
        .addField("Channel", `${message.channel.name} (${message.channel.id})`)
        .addField("Messaqe Content", `${message.content}`);

      let logchannel = client.channels.cache.get("684830225477140487");
      logchannel.send(logEmbed);

      message.reply("Don't use the bad letter!").then(message => {
        message.delete({ timeout: 4000 });
      });
    }

    // No prefix no fun
    if (!message.content.startsWith(client.config.prefix)) return;

    // Get command and execute it
    let cmd = client.cmds.get(
      array[0].replace(client.config.prefix, "").toLowerCase()
    );
    if (!cmd) return message.reply("404 Command not found.");

    cmd.run(client, message, args);
  }
};
