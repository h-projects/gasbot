module.exports = async (after, before) => {
  if (after.nickname === undefined || after.nickname === null || after.nickname === "") return;
  let upperCaseNick = after.nickname.toUpperCase();
  let lowDetection = /[^\sG]/gi;
  console.log(`after.nickname: ${after.nickname}`)
  console.log(`before.nickname: ${before.nickname}`)

  if (lowDetection.test(upperCaseNick) === false) {
    let newNickname = before.nickname
      .replace(new RegExp("G", "g"), "H")
      .replace(new RegExp("g", "g"), "h");
    after.setNickname(newNickname);
  }
};
