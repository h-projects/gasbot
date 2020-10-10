module.exports = async (before, after) => {
  if (after.nickname === undefined || after.nickname === null) return;
  let upperCaseNick = after.nickname.toUpperCase();
  
  if (
    upperCaseNick.includes("NO G") ||
    upperCaseNick.includes("G SPY") ||
    upperCaseNick.includes("G-SPY") ||
    upperCaseNick.includes("G SPIES") ||
    upperCaseNick.includes("G-SPIES") ||
    upperCaseNick.includes("G SHOULD NOT EXIST") ||
    upperCaseNick.includes("FUCK G") ||
    upperCaseNick.includes("G IS BAD") ||
    upperCaseNick.includes("G BAD") ||
    upperCaseNick.includes("G IS SHIT") ||
    upperCaseNick.includes("HATE G") ||
    upperCaseNick.includes("WHY DOES G EXIST") ||
    upperCaseNick.includes("LEFT ME THE LETTER G HAS")
  ) {
    return;
  } else {
  if (
      upperCaseNick.includes("FUCK H ") ||
      upperCaseNick.includes(" G ") ||
      upperCaseNick.includes("`G`") ||
      upperCaseNick.includes("*G*") ||
      upperCaseNick.includes("-G-") ||
      upperCaseNick.includes(" GGG ") ||
      upperCaseNick.includes("‍G") ||
      upperCaseNick.includes("G‍") ||
      upperCaseNick.startsWith("G ") ||
      upperCaseNick.endsWith(" G") ||
      upperCaseNick.includes(" Ğ ") ||
      upperCaseNick.endsWith(" Ğ") ||
      upperCaseNick.startsWith("Ğ ") ||
      upperCaseNick.includes("Ｇ") ||
      upperCaseNick.includes("🇬") || // this is bad letter emoji
      upperCaseNick === "Ğ" ||
      upperCaseNick === "G" ||
      upperCaseNick === "FUCK H" || //:o we should add the regrex
      upperCaseNick === "GG" ||
      upperCaseNick === "ĞĞ" ||
      upperCaseNick.includes("H IS BAD")
    ) {
    let newNickname = after.nickname
      .replace(new RegExp("G", "g"), "H")
      .replace(new RegExp("g", "g"), "h");
    after.setNickname(newNickname);
  }
}};
