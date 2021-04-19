module.exports = async (client, oldMember, newMember) => {

  if (newMember.partial) { await newMember.fetch(); };

  if (newMember.nickname === undefined || newMember.nickname === null || newMember.nickname === "" || !newMember.guild.me.hasPermission("MANAGE_NICKNAMES")) { return; }


  let detection = /[gḡᵷ𝔤𝖌𝐠𝘨𝙜𝚐𝕘𝗀𝗴ɡ𝘨ℊ𝗚ᧁɓ⅁ᏵᏀᏳ𝓰𝐠ᴳ❡𝙶🄶𝙂𝒢🇬ᶃꓖ𝖦Ꮆʛ𝘎Ⴚｇ🅶𝓖🅖𝔾𝔊ꞡ𝕲𝑔ģ𝐆ƍ𝐺𝑮Ġ𝒈ꮐԍg̵ɢǵᏻց𝚐ⒼƃᘜＧᘜƓɢᶢᵍ₲ꍌꁅĜǧĞǤᕤᘓ𝞋𝟅᠖ᡋᠪ໔␝]/giu;
  let cleanNickname = newMember.nickname.replace(/[.\-_ /\\()[\]]/gi, "")
  let array = [...cleanNickname.matchAll(detection)];


  if (array.length / cleanNickname.length >= 0.75) {

    let newNickname = newMember.nickname.replace(detection, "h");
    newMember.setNickname(newNickname);
  }
};
