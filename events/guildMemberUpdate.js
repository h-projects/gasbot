module.exports = {
  name: 'guildMemberUpdate',
  once: false,
  async execute(oldMember, newMember, client) {
    if (newMember.partial) {
      await newMember.fetch();
    }

    const badLetters = require('../detector/detection.json').join('');
    const detector = RegExp(`[${badLetters}]`, 'giu');
    const cleanNickname = newMember.displayName.replace(/[.\-_ /\\()[\]]/giu, '');
    const result = [...cleanNickname.matchAll(detector)];

    if (result.length / cleanNickname.length < 0.75 || !cleanNickname || !newMember.manageable || !newMember.guild.me.permissions.has('MANAGE_NICKNAMES')) {
      return;
    }

    const newNickname = newMember.displayName.replace(detector, 'h');
    newMember.setNickname(newNickname);

    if (newMember.user.bot) {
      return;
    }

    require('../detector/counter.js')(client, newMember.guild.id, newMember.id);
    require('../detector/logger.js')({ client, member: newMember, type: 'Nickname' });
  }
};
