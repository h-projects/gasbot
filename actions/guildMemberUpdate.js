module.exports = async (newMember, oldMember) => {
  if (newMember.nickname === undefined || newMember.nickname === null || newMember.nickname === "") return;
  let upperCaseNick = newMember.nickname.toUpperCase();
  let lowDetection = /[^\sG]/gi;
  console.log(`newMember.nickname: ${newMember.nickname}`)
  console.log(`oldMember.nickname: ${oldMember.nickname}`)

  if (lowDetection.test(upperCaseNick) === false) {
    let newNickname = oldMember.nickname
      .replace(new RegExp("G", "g"), "H")
      .replace(new RegExp("g", "g"), "h");
    newMember.setNickname(newNickname);
  }
};
