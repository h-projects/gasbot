module.exports = async (client, message, member) => {
  var array = message.content.split(" "),
    args = array.slice(1);

  const fs = require("fs-extra");
  var HowMuchGWasPosted = require("../database/badLetterCount.json");

  const raidmode = require("../database/raidmode.json");

  // Go aways bots and people who are trying to use commands on dm
  if (
    message.author.bot ||
    message.author.system ||
    message.channel.type == "dm" ||
    message.type !== "DEFAULT" ||
    message.content === ""
  )
    return;

  // G Detector™
  let upperCaseMsg = message.content.toUpperCase();
  const ultimateRegrexDetectortm = /[^\sg𝔤𝖌𝐠𝘨𝙜𝚐𝕘𝗀𝗴ɡ𝘨ℊ𝗚ᧁɓ⅁ᏵᏀᏳ🅶𝓰𝐠❡𝙶g҉𝙂🅖𝒢ᶃg̃ꓖ𝖦Ꮆʛ𝘎𝓖𝔾𝔊ꞡ𝕲𝑔ģ𝐆ƍ𝐺𝑮Ġ𝒈ꮐԍg̵ɢǵᏻց𝚐Ⓖ🄶ƃᘜＧᘜg̔Ɠɢᶢᵍ₲ꍌꁅĜǧĞ🇬Ǥ]/gi;
  const ultimateRegrexDetectorExceptItAlsoDetectsSpaceNogSpacetm = /(\s[g𝔤𝖌𝐠🅖𝘨ʛ𝙜ɓ⅁ꞡꍌᧁ🅶❡ᏀᏳ𝚐𝕘𝗀Ᏽ𝗴ɡg҉𝘨ℊ𝗚𝓰𝐠Ġ𝙶𝙂𝒢g̃ᶃᎶꓖ𝖦𝘎𝓖𝔾𝔊𝕲𝑔ģ𝐆ƍ𝐺𝑮𝒈ꮐԍg̵ɢǵᏻց𝚐Ⓖ🄶ƃᘜＧᘜg̔Ɠɢᶢᵍ₲ꁅĜǧĞ🇬Ǥ]+\s)|(^[g𝔤𝖌Ᏽ𝐠❡🅖𝘨🅶𝙜ᧁ𝚐ʛĠ𝕘ᏀᏳ𝗀ɓ𝗴ɡᎶ𝘨ℊ𝗚𝓰𝐠𝙶𝙂𝒢ᶃꓖ𝖦𝘎g̃𝓖𝔾𝔊𝕲𝑔ģ𝐆ƍg҉⅁𝐺𝑮𝒈ꮐԍg̵ɢǵᏻց𝚐Ⓖꞡ🄶ƃꍌᘜＧᘜg̔Ɠɢᶢᵍ₲ꁅĜǧĞ🇬Ǥ]+\s)|(\s[g𝔤𝖌𝐠𝘨ʛ𝙜𝚐𝕘🅖❡𝗀𝗴ꍌɡg̃𝘨ℊ𝗚ɓᏵ𝓰𝐠𝙶𝙂𝒢ᶃꓖꞡ𝖦𝘎𝓖𝔾⅁𝔊𝕲ᧁ𝑔ģᏀᏳ𝐆ƍĠᎶ𝐺𝑮𝒈ꮐԍg̵ɢǵg҉ᏻց𝚐Ⓖ🄶ƃᘜＧᘜg̔Ɠɢᶢᵍ🅶₲ꁅĜǧĞ🇬Ǥ]+$)/gi;
  // sorry idk how to make regrex readable

  if (
    upperCaseMsg.includes("NO G") ||
    upperCaseMsg.includes("H BETTER THAN G") ||
    upperCaseMsg.includes("H IS BETTER THAN G") ||
    upperCaseMsg.includes("SCHOOL IS G") ||
    upperCaseMsg.includes("H > G") ||
    upperCaseMsg.includes("G SPY") ||
    upperCaseMsg.includes("G SPIES") ||
    upperCaseMsg.includes("G SHOULD NOT EXIST") ||
    upperCaseMsg.includes("FUCK G") ||
    upperCaseMsg.includes("G IS BAD") ||
    upperCaseMsg.includes("G BAD") ||
    upperCaseMsg.includes("G IS SHIT") ||
    upperCaseMsg.includes("HATE G") ||
    upperCaseMsg.includes("WHY DOES G EXIST") ||
    upperCaseMsg.includes("G SUCK") ||
    upperCaseMsg.includes("G ANNIHILATION SQUAD") ||
    upperCaseMsg.includes("G.A.S") ||
    upperCaseMsg.includes(
      "EVERY DAY, COUNTLESS LIVES ARE LOST BY MISUSE OF THE LETTER G."
    ) ||
    upperCaseMsg.includes("LEFT ME THE LETTER G HAS")
  ) {
    return;
  } else {
    if (
      upperCaseMsg.includes("FUCK H ") ||
      ultimateRegrexDetectortm.test(message.content) === false ||
      ultimateRegrexDetectorExceptItAlsoDetectsSpaceNogSpacetm.test(
        message.content
      ) === true ||
      upperCaseMsg.includes("`G`") ||
      upperCaseMsg.includes("*G*") ||
      upperCaseMsg.includes("-G-") ||
      upperCaseMsg.includes("‍G") ||
      upperCaseMsg.includes("G‍") ||
      upperCaseMsg === "FUCK H" ||
      upperCaseMsg.includes("H IS BAD")
    ) {
      const theLoq = message.guild.channels.cache.find(
        channel => channel.name === "loqs"
      );
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

      let crossloqembed = new client.disc.MessageEmbed()
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
        .addField("User", `<@${message.author.id}> (${message.author.id})`)
        .addField("Channel", `<#${message.channel.id}> (${message.channel.id})`)
        .addField("Messaqe Content", `${message.content}`);

      let gasserverlog = client.channels.cache.get("707642156055265322");

      gasserverlog.send(logEmbed);

      HowMuchGWasPosted.badLetterCount++;

      fs.writeFile(
        "./database/badLetterCount.json",
        JSON.stringify(HowMuchGWasPosted),
        function(err) {
          if (err) return console.log(err);
        }
      );

      message.reply("Don't use the bad letter!").then(message => {
        message.delete({ timeout: 4000 });
      });
      theLoq.send(crossloqembed);
    }
  }

  if (
    message.content === "<@!702116355842768927>" ||
    upperCaseMsg === "<@!702116355842768927> help"
  ) {
    message.channel.send(
      `<@!${message.author.id}>, my prefix is "${client.config.prefix}"`
    );
  }

  // No prefix no fun
  if (!message.content.startsWith(client.config.prefix)) return;

  // Get command and execute it
  let cmd = client.cmds.get(
    array[0].replace(client.config.prefix, "").toLowerCase()
  );
  if (!cmd)
    return message.reply({
      embed: {
        color: 15158332,
        title: "404 Not Found",
        description: `Try usinq ${client.config.prefix}help`
      }
    });

  cmd.run(client, message, args);
};
