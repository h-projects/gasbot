module.exports = async (before, after) => {
  if (after.nickname === undefined || after.nickname === null) return;
  let upperCaseNick = after.nickname.toUpperCase();
  if (
    upperCaseNick.includes(" G ") ||
    upperCaseNick.includes(" GGG ") ||
    upperCaseNick.includes("‍G") ||
    upperCaseNick.includes("G‍") ||
    upperCaseNick.startsWith("G ") ||
    upperCaseNick.endsWith(" G") ||
    upperCaseNick.includes("🇬") ||
    // upperCaseNick.includes("G") || // AntiRaid mode until we add a better one. delete the // at the start to enable and put it to disable.
    upperCaseNick === "G" ||
    upperCaseNick === "GG"
  ) {
    let newNickname = after.nickname
      .replace(new RegExp("G", "g"), "H")
      .replace(new RegExp("g", "g"), "h");
    after.setNickname(newNickname);
    return;
  }
};
