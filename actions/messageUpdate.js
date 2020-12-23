module.exports = async (client, oldMessage, message) => {
    const fs = require("fs-extra");
    var HowMuchGWasPosted = require("../database/badLetterCount.json");
    var HowMuchGWasPostedUser = require("../database/badLetterUser.json");
    var loqs = require("../database/loqs.json");
      
    if (message.partial) {
      await message.fetch()
    };
	    
    // Go aways bots and people who are trying to use commands on dm
    if (
      message.author.bot ||
      message.author.system ||
      message.channel.type == "dm" ||
      message.type !== "DEFAULT" ||
      message.content === ""
    )
      return;
	    
    let upperCaseMsg = message.content.toUpperCase();
      
    // G Detector™
    let lowDetection = /[^\sg𝔤𝖌𝐠𝘨𝙜𝚐𝕘𝗀𝗴ɡ𝘨ℊ𝗚ᧁɓ⅁ᏵᏀᏳ𝓰𝐠ᴳ❡𝙶🄶𝙂𝒢🇬ᶃꓖ𝖦Ꮆʛ𝘎🅶𝓖🅖𝔾𝔊ꞡ𝕲𝑔ģ𝐆ƍ𝐺𝑮Ġ𝒈ꮐԍg̵ɢǵᏻց𝚐ⒼƃᘜＧᘜƓɢᶢᵍ₲ꍌꁅĜǧĞǤᕤᘓ𝞋𝟅᠖ᡋᠪ໔]/giu;
    let mediumDetection = /(\s[g𝔤𝖌𝐠𝘨𝙜𝚐𝕘𝗀𝗴ɡ𝘨ℊ𝗚ᧁɓ⅁ᏵᏀᏳ𝓰𝐠ᴳ❡𝙶🄶𝙂𝒢🇬ᶃꓖ𝖦Ꮆʛ𝘎🅶𝓖🅖𝔾𝔊ꞡ𝕲𝑔ģ𝐆ƍ𝐺𝑮Ġ𝒈ꮐԍg̵ɢǵᏻց𝚐ⒼƃᘜＧᘜƓɢᶢᵍ₲ꍌꁅĜǧĞǤᕤᘓ𝞋𝟅᠖ᡋᠪ໔]+\s)|(^[g𝔤𝖌𝐠𝘨𝙜𝚐𝕘𝗀𝗴ɡ𝘨ℊ𝗚ᧁɓ⅁ᏵᏀᏳ𝓰𝐠ᴳ❡𝙶🄶𝙂𝒢🇬ᶃꓖ𝖦Ꮆʛ𝘎🅶𝓖🅖𝔾𝔊ꞡ𝕲𝑔ģ𝐆ƍ𝐺𝑮Ġ𝒈ꮐԍg̵ɢǵᏻց𝚐ⒼƃᘜＧᘜƓɢᶢᵍ₲ꍌꁅĜǧĞǤᕤᘓ𝞋𝟅᠖ᡋᠪ໔]+\s)|(\s[g𝔤𝖌𝐠𝘨𝙜𝚐𝕘𝗀𝗴ɡ𝘨ℊ𝗚ᧁɓ⅁ᏵᏀᏳ𝓰𝐠ᴳ❡𝙶🄶𝙂𝒢🇬ᶃꓖ𝖦Ꮆʛ𝘎🅶𝓖🅖𝔾𝔊ꞡ𝕲𝑔ģ𝐆ƍ𝐺𝑮Ġ𝒈ꮐԍg̵ɢǵᏻց𝚐ⒼƃᘜＧᘜƓɢᶢᵍ₲ꍌꁅĜǧĞǤᕤᘓ𝞋𝟅᠖ᡋᠪ໔]+$)/giu; // Medium level also uses low level detection. Ik that this is fucked up but whatever. It just works.
    let hiqhDetection = /[g𝔤𝖌𝐠𝘨𝙜𝚐𝕘𝗀𝗴ɡ𝘨ℊ𝗚ᧁɓ⅁ᏵᏀᏳ𝓰𝐠ᴳ❡𝙶🄶𝙂𝒢🇬ᶃꓖ𝖦Ꮆʛ𝘎🅶𝓖🅖𝔾𝔊ꞡ𝕲𝑔ģ𝐆ƍ𝐺𝑮Ġ𝒈ꮐԍg̵ɢǵᏻց𝚐ⒼƃᘜＧᘜƓɢᶢᵍ₲ꍌꁅĜǧĞǤᕤᘓ𝞋𝟅᠖ᡋᠪ໔␝]/giu;
    let blacklist = [" FUCK H ", "`G`", "\\*G\\*", "~~G~~", " H IS BAD "]
        
      function gDetected() {
        // Check if the bot has perms and delete messaqe
        if (message.guild.me.hasPermission("MANAGE_MESSAGES")) { message.delete(); };
        if (message.guild.me.hasPermission("SEND_MESSAGES")) {
            message.reply("don't use the bad letter!").then(message => { message.delete({ timeout: 4000 }); });
        };
      
        // Make the removed count qo up    
      HowMuchGWasPosted.badLetterCount++;
      fs.writeFile(
        "./database/badLetterCount.json",
        JSON.stringify(HowMuchGWasPosted),
        function(err) {
          if (err) return console.error(`Somethinq qone G in updatinq how much G's was posted: ${err}`);
        }
      );

      if (HowMuchGWasPostedUser[message.author.id] !== undefined) {

        HowMuchGWasPostedUser[message.author.id]++;

      } else {

        HowMuchGWasPostedUser[message.author.id] = 1;
        
      };

      fs.writeFile(
        "./database/badLetterUser.json",
        JSON.stringify(HowMuchGWasPostedUser),
        function(err) {
          if (err) return console.error(`Somethinq qone G in updatinq how much G's was posted with an user: ${err}`);
        }
      );
	  
      // Send loqs messaqe

      if (loqs[message.guild.id] !== undefined) {
        var loqChannel = message.guild.channels.cache.find(channel => channel.name === loqs[message.guild.id]);
      } else {
        var loqChannel = message.guild.channels.cache.find(channel => channel.name === "loqs");
      }

      let centralLoq = client.channels.cache.get("707642156055265322");
          
        let loqEmbed = new client.disc.MessageEmbed()
          .setFooter("G.A.S Bot", client.user.avatarURL({dynamic: true}))
          .setURL("https://aytchsoftware.tk/fuck-g/")
          .setThumbnail(`${message.author.avatarURL({dynamic: true})}`)
          .setTimestamp()
          .setColor("E74C3C")
          .setTitle("G Removal")
          .addField("User", `<@${message.author.id}> (${message.author.id})`)
          .addField("Channel", `<#${message.channel.id}> (${message.channel.id})`)
          .addField("Messaqe Content", message.content);
          
        let centralLoqEmbed = new client.disc.MessageEmbed()
          .setFooter("G.A.S Bot", client.user.avatarURL({dynamic: true}))
          .setURL("https://aytchsoftware.tk/fuck-g/")
          .setThumbnail(`${message.author.avatarURL({dynamic: true})}`)
          .setTimestamp()
          .setColor("E74C3C")
          .setTitle("G Removal")
          .addField("User", `${message.author.tag} (${message.author.id})`)
          .addField("Server", `${message.guild.name} (${message.guild.id})`)
          .addField("Channel", `${message.channel.name} (${message.channel.id})`)
          .addField("Messaqe Content", `${message.content}`);
       
        
        if (message.guild.me.hasPermission("MANAGE_MESSAGES")) {    
          if (loqChannel !== undefined) { loqChannel.send(loqEmbed); };
          if (message.guild.id != "701809497206685796") { centralLoq.send(centralLoqEmbed); };
        }}
  
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
    ) { return; } else {
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
};
