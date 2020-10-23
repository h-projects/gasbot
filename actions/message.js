module.exports = async (client, message, member) => {
  var array = message.content.split(" "),
    args = array.slice(1);
  const fs = require("fs-extra");
  var HowMuchGWasPosted = require("../database/badLetterCount.json");
  let upperCaseMsg = message.content.toUpperCase();
	
  // stupid goddamn function from stackoverflow
  // stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript
  function cptlzeFrstLttr(str) {
	str.charAt(0).toUpperCase() + str.slice(1);
  }
  
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
  if (!message.content.startsWith("h!eval")) {
  let lowDetection = /[^\sg𝔤𝖌𝐠𝘨𝙜𝚐𝕘𝗀𝗴ɡ𝘨ℊ𝗚ᧁɓ⅁ᏵᏀᏳ𝓰𝐠ᴳ❡𝙶𝙂𝒢ᶃꓖ𝖦Ꮆʛ𝘎𝓖𝔾𝔊ꞡ𝕲𝑔ģ𝐆ƍ𝐺𝑮Ġ𝒈ꮐԍg̵ɢǵᏻց𝚐ⒼƃᘜＧᘜƓɢᶢᵍ₲ꍌꁅĜǧĞǤᕤᘓ𝞋𝟅᠖ᡋᠪ໔]/gi;
  let mediumDetection = /(\s[g𝔤𝖌𝐠𝘨𝙜𝚐𝕘𝗀𝗴ɡ𝘨ℊ𝗚ᧁɓ⅁ᏵᏀᏳ𝓰𝐠ᴳ❡𝙶𝙂𝒢ᶃꓖ𝖦Ꮆʛ𝘎𝓖𝔾𝔊ꞡ𝕲𝑔ģ𝐆ƍ𝐺𝑮Ġ𝒈ꮐԍg̵ɢǵᏻց𝚐ⒼƃᘜＧᘜƓɢᶢᵍ₲ꍌꁅĜǧĞǤᕤᘓ𝞋𝟅᠖ᡋᠪ໔]+\s)|(^[g𝔤𝖌𝐠𝘨𝙜𝚐𝕘𝗀𝗴ɡ𝘨ℊ𝗚ᧁɓ⅁ᏵᏀᏳ𝓰𝐠ᴳ❡𝙶𝙂𝒢ᶃꓖ𝖦Ꮆʛ𝘎𝓖𝔾𝔊ꞡ𝕲𝑔ģ𝐆ƍ𝐺𝑮Ġ𝒈ꮐԍg̵ɢǵᏻց𝚐ⒼƃᘜＧᘜƓɢᶢᵍ₲ꍌꁅĜǧĞǤᕤᘓ𝞋𝟅᠖ᡋᠪ໔]+\s)|(\s[g𝔤𝖌𝐠𝘨𝙜𝚐𝕘𝗀𝗴ɡ𝘨ℊ𝗚ᧁɓ⅁ᏵᏀᏳ𝓰𝐠ᴳ❡𝙶𝙂𝒢ᶃꓖ𝖦Ꮆʛ𝘎𝓖𝔾𝔊ꞡ𝕲𝑔ģ𝐆ƍ𝐺𝑮Ġ𝒈ꮐԍg̵ɢǵᏻց𝚐ⒼƃᘜＧᘜƓɢᶢᵍ₲ꍌꁅĜǧĞǤᕤᘓ𝞋𝟅᠖ᡋᠪ໔]+$)/gi; // Medium level also uses low level detection. Ik that this is fucked up but whatever. It just works.
  let hiqhDetection = /[g𝔤𝖌𝐠𝘨𝙜𝚐𝕘𝗀𝗴ɡ𝘨ℊ𝗚ᧁɓ⅁ᏵᏀᏳ𝓰𝐠ᴳ❡𝙶𝙂𝒢ᶃꓖ𝖦Ꮆʛ𝘎𝓖𝔾𝔊ꞡ𝕲𝑔ģ𝐆ƍ𝐺𝑮Ġ𝒈ꮐԍg̵ɢǵᏻց𝚐ⒼƃᘜＧᘜƓɢᶢᵍ₲ꍌꁅĜǧĞǤᕤᘓ𝞋𝟅᠖ᡋᠪ໔␝]/gi;
  let gasserverlog = client.channels.cache.get("707642156055265322");
    function gDetected() {
      let loqChannel = message.guild.channels.cache.find(
        channel => channel.name === "loqs"
      );
      message.delete().catch(() => { console.error("Can't delete messaqe"); });
      let qlobalLoqEmbed = new client.disc.MessageEmbed()
        .setFooter("G.A.S Bot", client.user.avatarURL())
        .setURL("https://aytchsoftware.tk/fuck-g/")
        .setThumbnail(`${message.author.avatarURL()}`)
        .setTimestamp()
        .setColor("E74C3C")
        .setTitle("G Removal")
        .addField("User", `${message.author.tag} (${message.author.id})`)
        .addField("Server", `${message.guild.name} (${message.guild.id})`)
        .addField("Channel", `${message.channel.name} (${message.channel.id})`)
        .addField("Messaqe Content", `${message.content}`);
      let loqEmbed = new client.disc.MessageEmbed()
        .setFooter("G.A.S Bot", client.user.avatarURL())
        .setURL("https://aytchsoftware.tk/fuck-g/")
        .setThumbnail(`${message.author.avatarURL()}`)
        .setTimestamp()
        .setColor("E74C3C")
        .setTitle("G Removal")
        .addField("User", `<@${message.author.id}> (${message.author.id})`)
        .addField("Channel", `<#${message.channel.id}> (${message.channel.id})`)
        .addField("Messaqe Content", message.content);
      HowMuchGWasPosted.badLetterCount++;
      fs.writeFile(
        "./database/badLetterCount.json",
        JSON.stringify(HowMuchGWasPosted),
        function(err) {
          if (err) return console.log(`Somethinq qone G in updatinq how much G's was posted: ${err}`);
        }
      );
      message.reply("don't use the bad letter!").then(message => {
        message.delete({ timeout: 4000 });
      }).catch(() => { console.error("Can't post messaqe"); });
      loqChannel.send(loqEmbed).catch();
      if (message.guild.id != "701809497206685796") { gasserverlog.send(qlobalLoqEmbed).catch(() => { console.error("Central G.A.S #loqs channel not found"); }); };
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
    upperCaseMsg.includes("G SUCK") ||
    upperCaseMsg.includes("G ANNIHILATION SQUAD") ||
    upperCaseMsg.includes("EVERY DAY, COUNTLESS LIVES ARE LOST BY MISUSE OF THE LETTER G.")
  ) {return;} else {
    switch(client.raidmode[message.guild.id]) {
      case 1: // Low
        if (
          lowDetection.test(message.content) === false
        ) gDetected();
      break;
      case 2: // Medium
      case undefined:
        if (
          lowDetection.test(message.content) === false ||
          mediumDetection.test(message.content) === true
        ) gDetected();
      break;
      case 3: // Hiqh
        if (
          hiqhDetection.test(message.content) === true
        ) gDetected();
      break;
    }
    if(
      upperCaseMsg.includes(" FUCK H ") ||
      upperCaseMsg.startsWith("FUCK H ") ||
      upperCaseMsg.endsWith(" FUCK H") ||
      upperCaseMsg.includes("`G`") ||
      upperCaseMsg.includes("*G*") ||
      upperCaseMsg.includes("~~G~~") ||
      upperCaseMsg.includes(" H IS BAD ") ||
      upperCaseMsg.startsWith("H IS BAD ") ||
      upperCaseMsg.endsWith(" H IS BAD")
    ) gDetected();
  }}
// End of G Detector™
  if (
    message.content === "<@702116355842768927>" || message.content === "<@!702116355842768927>" ||
    upperCaseMsg === "<@702116355842768927> HELP" || upperCaseMsg === "<@!702116355842768927> HELP"
  ) {
    message.reply(
      "my prefix is `" + `${client.config.prefix}` + "`"
    );
  }
  // No prefix no fun
  if (!message.content.startsWith(client.config.prefix)) return;
  // Get command and execute it
  let cmd = client.cmds.get(
    array[0].replace(client.config.prefix, "").toLowerCase()
  );
  if (!cmd)
    return; /* message.channel.send({
      embed: {
        color: 15158332,
        title: "404 Not Found",
        description: `Try usinq ${client.config.prefix}help`
      }
    }); */
  cmd.run(client, message, args);
};
