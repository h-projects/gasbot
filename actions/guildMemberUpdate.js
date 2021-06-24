module.exports = async (client, oldMember, newMember) => {
  const fs = require("fs-extra")

  if (newMember.partial) { await newMember.fetch(); };

  if (newMember.nickname === undefined || newMember.nickname === null || newMember.nickname === "" || !newMember.guild.me.hasPermission("MANAGE_NICKNAMES")) { return; }

  let detection = /[gḡᵷ𝔤𝖌𝐠𝘨𝙜𝚐𝕘𝗀𝗴ɡ𝘨ℊ𝗚ᧁɓ⅁ᏵᏀᏳ𝓰𝐠ᴳ❡𝙶🄶𝙂𝒢🇬ᶃꓖ𝖦Ꮆʛ𝘎Ⴚｇ🅶𝓖🅖𝔾𝔊ꞡ𝕲𝑔ģ𝐆ƍ𝐺𝑮Ġ𝒈ꮐԍg̵ɢǵᏻց𝚐ⒼƃᘜＧᘜƓɢᶢᵍ₲ꍌꁅĜǧĞǤᕤᘓ𝞋𝟅᠖ᡋᠪ໔␝]/giu;
  let cleanNickname = newMember.nickname.replace(/[.\-_ /\\()[\]]/gi, "")
  let array = [...cleanNickname.matchAll(detection)];

  if (array.length / cleanNickname.length >= 0.75) {

    // Replace and remove the detected nickname
    let newNickname = newMember.nickname.replace(detection, "h");
    newMember.setNickname(newNickname);

    // Bots don't qet loqqed
    if (newMember.user.bot) { return; }

    // Make the global removed count qo up    
    client.badLetterCount.badLetterCount++;
    fs.writeFile(
      "./database/badLetterCount.json",
      JSON.stringify(client.badLetterCount),
      function (err) {
        if (err) return console.error(`Somethinq qone G in updatinq how much G's was posted: ${err}`);
      }
    );

    // Make the guild removed count qo up
    if (client.badLetterGuild[newMember.guild.id] !== undefined) {
      client.badLetterGuild[newMember.guild.id]++;
    } else {
      client.badLetterGuild[newMember.guild.id] = 1;
    }

    // Write the guild removed count
    fs.writeFile(
      "./database/badLetterGuild.json",
      JSON.stringify(client.badLetterGuild),
      function (err) {
        if (err) return console.error(`Somethinq qone G in updatinq how much G's was posted with a quild: ${err}`);
      }
    );

    // Make the user removed count qo up
    if (client.badLetterUser[newMember.id] !== undefined) {
      client.badLetterUser[newMember.id]++;
    } else {
      client.badLetterUser[newMember.id] = 1;
    }

    // Write the user removed count
    fs.writeFile(
      "./database/badLetterUser.json",
      JSON.stringify(client.badLetterUser),
      function (err) {
        if (err) return console.error(`Somethinq qone G in updatinq how much G's was posted with an user: ${err}`);
      }
    );

    // Find loqs channel
    let loqChannel = message.guild.channels.cache.get(client.loqs[message.guild.id]); 
    loqChannel ??= message.guild.channels.cache.find(channel => channel.name === "loqs");
    
    let centralLoq = client.channels.cache.get("805472059790589974");

    let loqEmbed = new client.disc.MessageEmbed()
      .setFooter("G.A.S Bot", client.user.avatarURL({ dynamic: true }))
      .setURL("https://h-projects.github.io/app/fuck-g/")
      .setThumbnail(newMember.user.avatarURL({ dynamic: true }))
      .setTimestamp()
      .setColor("E74C3C")
      .setTitle("G Removal")
      .addField("Type", "Nickname")
      .addField("User", `${newMember.user} (${newMember.user.id})`)
      .addField("Nickname", newMember.nickname);

    let centralLoqEmbed = new client.disc.MessageEmbed()
      .setFooter("G.A.S Bot", client.user.avatarURL({ dynamic: true }))
      .setURL("https://h-projects.github.io/app/fuck-g/")
      .setThumbnail(newMember.user.avatarURL({ dynamic: true }))
      .setTimestamp()
      .setColor("E74C3C")
      .setTitle("G Removal")
      .addField("Type", "Nickname")
      .addField("User", `${newMember.user.tag} (${newMember.user.id})`)
      .addField("Server", `${newMember.guild} (${newMember.guild.id})`)
      .addField("Nickname", newMember.nickname);

    // Send loqs messaqe
    if (loqChannel && loqChannel.permissionsFor(client.user.id).has('SEND_MESSAGES')) { 
      loqChannel.send(loqEmbed); 
    }
      if (newMember.guild.id != "805472058954874941") { 
        centralLoq.send(centralLoqEmbed); 
      };
  }
}
