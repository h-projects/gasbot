module.exports = async (newMember, oldMember) => {
  console.log(`old: ${oldMember.nickname}, new: ${newMember}`);
  if (newMember.nickname === undefined || newMember.nickname === null || newMember.nickname === "") return;
  let upperCaseNick = newMember.nickname.toUpperCase();
  let lowDetection = /[^\sG]/gi;
  console.log(`newMember.nickname: ${newMember.nickname}`)
  console.log(`oldMember.nickname: ${oldMember.nickname}`)

  if (lowDetection.test(upperCaseNick) === false) {
    let newNickname = oldMember.nickname
      .replaceAll(new RegExp("G", "g"), "H")
      .replaceAll(new RegExp("g", "g"), "h");
    newMember.setNickname(newNickname);
  }
};
