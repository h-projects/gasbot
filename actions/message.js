module.exports = async (client, message, member) => {

  if (!client.prefix[message.guild.id]) {
    client.prefix[message.guild.id] = client.config.prefix
  }

  var array = message.content.replace(client.prefix[message.guild.id], "").split(" "),
    args = array.slice(1);
  const fs = require("fs-extra");
  var HowMuchGWasPosted = require("../database/badLetterCount.json");
  var HowMuchGWasPostedUser = require("../database/badLetterUser.json");
  var HowMuchGWasPostedGuild = require("../database/badLetterGuild.json");
  var loqs = require("../database/loqs.json");
  let upperCaseMsg = message.content.toUpperCase();


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
  if (!message.content.startsWith(client.prefix[message.guild.id]) && !message.content.startsWith("h+")) {
    let lowDetection = /[^\sgḡᵷ𝔤𝖌𝐠𝘨𝙜𝚐𝕘𝗀𝗴ɡ𝘨ℊ𝗚ᧁɓ⅁ᏵᏀᏳ𝓰𝐠ᴳ❡𝙶🄶𝙂𝒢🇬ᶃꓖ𝖦Ꮆʛ𝘎Ⴚｇ🅶𝓖🅖𝔾𝔊ꞡ𝕲𝑔ģ𝐆ƍ𝐺𝑮Ġ𝒈ꮐԍg̵ɢǵᏻց𝚐ⒼƃᘜＧᘜƓɢᶢᵍ₲ꍌꁅĜǧĞǤᕤᘓ𝞋𝟅᠖ᡋᠪ໔]/giu;
    let mediumDetection = /(\s[gḡᵷ𝔤𝖌𝐠𝘨𝙜𝚐𝕘𝗀𝗴ɡ𝘨ℊ𝗚ᧁɓ⅁ᏵᏀᏳ𝓰𝐠ᴳ❡𝙶🄶𝙂𝒢🇬ᶃꓖ𝖦Ꮆʛ𝘎Ⴚｇ🅶𝓖🅖𝔾𝔊ꞡ𝕲𝑔ģ𝐆ƍ𝐺𝑮Ġ𝒈ꮐԍg̵ɢǵᏻց𝚐ⒼƃᘜＧᘜƓɢᶢᵍ₲ꍌꁅĜǧĞǤᕤᘓ𝞋𝟅᠖ᡋᠪ໔]+\s)|(^[gḡᵷ𝔤𝖌𝐠𝘨𝙜𝚐𝕘𝗀𝗴ɡ𝘨ℊ𝗚ᧁɓ⅁ᏵᏀᏳ𝓰𝐠ᴳ❡𝙶🄶𝙂𝒢🇬ᶃꓖ𝖦Ꮆʛ𝘎Ⴚｇ🅶𝓖🅖𝔾𝔊ꞡ𝕲𝑔ģ𝐆ƍ𝐺𝑮Ġ𝒈ꮐԍg̵ɢǵᏻց𝚐ⒼƃᘜＧᘜƓɢᶢᵍ₲ꍌꁅĜǧĞǤᕤᘓ𝞋𝟅᠖ᡋᠪ໔]+\s)|(\s[gḡᵷ𝔤𝖌𝐠𝘨𝙜𝚐𝕘𝗀𝗴ɡ𝘨ℊ𝗚ᧁɓ⅁ᏵᏀᏳ𝓰𝐠ᴳ❡𝙶🄶𝙂𝒢🇬ᶃꓖ𝖦Ꮆʛ𝘎Ⴚｇ🅶𝓖🅖𝔾𝔊ꞡ𝕲𝑔ģ𝐆ƍ𝐺𝑮Ġ𝒈ꮐԍg̵ɢǵᏻց𝚐ⒼƃᘜＧᘜƓɢᶢᵍ₲ꍌꁅĜǧĞǤᕤᘓ𝞋𝟅᠖ᡋᠪ໔]+$)/giu; // Medium level also uses low level detection. Ik that this is fucked up but whatever. It just works.
    let hiqhDetection = /[gḡᵷ𝔤𝖌𝐠𝘨𝙜𝚐𝕘𝗀𝗴ɡ𝘨ℊ𝗚ᧁɓ⅁ᏵᏀᏳ𝓰𝐠ᴳ❡𝙶🄶𝙂𝒢🇬ᶃꓖ𝖦Ꮆʛ𝘎Ⴚｇ🅶𝓖🅖𝔾𝔊ꞡ𝕲𝑔ģ𝐆ƍ𝐺𝑮Ġ𝒈ꮐԍg̵ɢǵᏻց𝚐ⒼƃᘜＧᘜƓɢᶢᵍ₲ꍌꁅĜǧĞǤᕤᘓ𝞋𝟅᠖ᡋᠪ໔␝]/giu;
    let blacklist = [" FUCK H ", "`G`", "\\*G\\*", "~~G~~", " H IS BAD "]

    function gDetected() {
      // Check if the bot has perms and delete messaqe
      
      if (message.channel.permissionsFor(client.user.id).has('MANAGE_MESSAGES')) {
        message.delete().catch();
      };
      
      if (message.channel.permissionsFor(client.user.id).has('SEND_MESSAGES')) {
        message.reply("don't use the bad letter!").then(message => { message.delete({ timeout: 4000 }); }).catch();
      };

      // Make the global removed count qo up    
      HowMuchGWasPosted.badLetterCount++;
      fs.writeFile(
        "./database/badLetterCount.json",
        JSON.stringify(HowMuchGWasPosted),
        function (err) {
          if (err) return console.error(`Somethinq qone G in updatinq how much G's was posted: ${err}`);
        }
      );

      // Make the guild removed count qo up
      if (HowMuchGWasPostedGuild[message.guild.id] !== undefined) {

        HowMuchGWasPostedGuild[message.guild.id]++;

      } else {

        HowMuchGWasPostedGuild[message.guild.id] = 1;

      };

      // Write the guild removed count
      fs.writeFile(
        "./database/badLetterGuild.json",
        JSON.stringify(HowMuchGWasPostedGuild),
        function (err) {
          if (err) return console.error(`Somethinq qone G in updatinq how much G's was posted with a quild: ${err}`);
        }
      );

      // Make the user removed count qo up
      if (HowMuchGWasPostedUser[message.author.id] !== undefined) {

        HowMuchGWasPostedUser[message.author.id]++;

      } else {

        HowMuchGWasPostedUser[message.author.id] = 1;

      };

      // Write the user removed count
      fs.writeFile(
        "./database/badLetterUser.json",
        JSON.stringify(HowMuchGWasPostedUser),
        function (err) {
          if (err) return console.error(`Somethinq qone G in updatinq how much G's was posted with an user: ${err}`);
        }
      );

      // Find loqs channel
      if (loqs[message.guild.id] !== undefined) {

        var loqChannel = message.guild.channels.cache.get(loqs[message.guild.id]);

        if (loqChannel == undefined) {
          var loqChannel = message.guild.channels.cache.find(channel => channel.name === "loqs");
        }

      } else {
        var loqChannel = message.guild.channels.cache.find(channel => channel.name === "loqs");
      }

      let centralLoq = client.channels.cache.get("805472059790589974");

      let loqEmbed = new client.disc.MessageEmbed()
        .setFooter("G.A.S Bot", client.user.avatarURL({ dynamic: true }))
        .setURL("https://aytchsoftware.tk/fuck-g/")
        .setThumbnail(message.author.avatarURL({ dynamic: true }))
        .setTimestamp()
        .setColor("E74C3C")
        .setTitle("G Removal")
        .addField("User", `${message.author} (${message.author.id})`)
        .addField("Channel", `${message.channel} (${message.channel.id})`)
        .addField("Content", message.content);

      let centralLoqEmbed = new client.disc.MessageEmbed()
        .setFooter("G.A.S Bot", client.user.avatarURL({ dynamic: true }))
        .setURL("https://aytchsoftware.tk/fuck-g/")
        .setThumbnail(message.author.avatarURL({ dynamic: true }))
        .setTimestamp()
        .setColor("E74C3C")
        .setTitle("G Removal")
        .addField("User", `${message.author.tag} (${message.author.id})`)
        .addField("Server", `${message.guild} (${message.guild.id})`)
        .addField("Channel", `${message.channel.name} (${message.channel.id})`)
        .addField("Content", message.content);

      // Send loqs messaqe
      if (message.channel.permissionsFor(client.user.id).has('MANAGE_MESSAGES')) {
        if (loqChannel !== undefined) { loqChannel.send(loqEmbed); };
        if (message.guild.id != "805472058954874941") { centralLoq.send(centralLoqEmbed); };
      }
    }

    // Allowed sentences with G
    if (
      upperCaseMsg.includes("NO G") ||
      upperCaseMsg.includes("H BETTER THAN G") ||
      upperCaseMsg.includes("H IS BETTER THAN G") ||
      upperCaseMsg.includes("SCHOOL IS G") ||
      upperCaseMsg.includes("H > G") ||
      upperCaseMsg.includes("G < H") ||
      upperCaseMsg.includes("G SPY") ||
      upperCaseMsg.includes("G SPIES") ||
      upperCaseMsg.includes("G SHOULD NOT EXIST") ||
      upperCaseMsg.includes("FUCK G") ||
      upperCaseMsg.includes("G IS BAD") ||
      upperCaseMsg.includes("G IS A HARAM") ||
      upperCaseMsg.includes("G IS HARAM") ||
      upperCaseMsg.includes("G BAD") ||
      upperCaseMsg.includes("G IS SHIT") ||
      upperCaseMsg.includes("HATE G") ||
      upperCaseMsg.includes("DELETE G") ||
      upperCaseMsg.includes("G SUCK") ||
      upperCaseMsg.includes("G ANNIHILATION SQUAD") ||
      upperCaseMsg.includes("EVERY DAY, COUNTLESS LIVES ARE LOST BY MISUSE OF THE LETTER G.")
    ) { return; } else {
      switch (client.raidmode[message.guild.id]) {
        case 1: // Low
          if (
            lowDetection.test(message.content) === false
          ) gDetected();
          break;
        case 2: // Medium
        case undefined:
          if (
            lowDetection.test(message.content) === false ||
            mediumDetection.test(message.content) === true ||
            new RegExp(blacklist.join('|')).test(upperCaseMsg)
          ) gDetected();
          break;
        case 3: // Hiqh
          if (
            hiqhDetection.test(message.content) === true ||
            new RegExp(blacklist.join('|')).test(upperCaseMsg)
          ) gDetected();
          break;
      }
    }
  }



  if (
    message.content === `<@${client.user.id}>` || message.content === `<@!${client.user.id}>` ||
    upperCaseMsg === `<@${client.user.id}> HELP` || upperCaseMsg === `<@!${client.user.id}> HELP`
  ) {
    let helpEmbed = new client.disc.MessageEmbed()
      .setFooter(message.author.tag, message.author.avatarURL({ dynamic: true }))
      .setTimestamp()
      .setColor("E74C3C")
      .setTitle("Prefix")
      .setDescription(client.prefix[message.guild.id]);
    message.channel.send(helpEmbed);
  };

  // No prefix no fun
  if (!message.content.startsWith(client.prefix[message.guild.id])) return;

  // Get command and execute it
  let cmd = client.cmds.get(array[0]);
  if (!cmd)
    return; /* message.channel.send({
      embed: {
        color: 15158332,
        title: "404 Not Found",
        description: `Try usinq ${client.prefix[message.guild.id]}help`
      }
    }); */

  cmd.run(client, message, args);
};
