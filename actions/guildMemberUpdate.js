module.exports = async (before, after) => {
  if (after.nickname === undefined || after.nickname === null || after.nickname === "") return;
  let upperCaseNick = after.nickname.toUpperCase();
  let lowDetection = /[^\sG]/gi;

  if (lowDetection.test(upperCaseNick) === false) {
    let newNickname = after.nickname
      .replace(new RegExp("G", "g"), "H")
      .replace(new RegExp("g", "g"), "h");
    after.setNickname(newNickname);
  }
};