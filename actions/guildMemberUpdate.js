module.exports = async (client, oldMember, newMember) => {
  if (newMember.nickname === undefined || newMember.nickname === null || newMember.nickname === "") { return; }
  let lowDetection = /[^\sgḡᵷ𝔤𝖌𝐠𝘨𝙜𝚐𝕘𝗀𝗴ɡ𝘨ℊ𝗚ᧁɓ⅁ᏵᏀᏳ𝓰𝐠ᴳ❡𝙶🄶𝙂𝒢🇬ᶃꓖ𝖦Ꮆʛ𝘎Ⴚｇ🅶𝓖🅖𝔾𝔊ꞡ𝕲𝑔ģ𝐆ƍ𝐺𝑮Ġ𝒈ꮐԍg̵ɢǵᏻց𝚐ⒼƃᘜＧᘜƓɢᶢᵍ₲ꍌꁅĜǧĞǤᕤᘓ𝞋𝟅᠖ᡋᠪ໔]+/gi;

  
  if (lowDetection.test(newMember.nickname) === false) {
    
    let newNickname = newMember.nickname
      .replace(/[gḡᵷ𝔤𝖌𝐠𝘨𝙜𝚐𝕘𝗀𝗴ɡ𝘨ℊ𝗚ᧁɓ⅁ᏵᏀᏳ𝓰𝐠ᴳ❡𝙶🄶𝙂𝒢🇬ᶃꓖ𝖦Ꮆʛ𝘎Ⴚｇ🅶𝓖🅖𝔾𝔊ꞡ𝕲𝑔ģ𝐆ƍ𝐺𝑮Ġ𝒈ꮐԍg̵ɢǵᏻց𝚐ⒼƃᘜＧᘜƓɢᶢᵍ₲ꍌꁅĜǧĞǤᕤᘓ𝞋𝟅᠖ᡋᠪ໔]+/gi, "h");
      newMember.setNickname(newNickname);
    
  }
};
