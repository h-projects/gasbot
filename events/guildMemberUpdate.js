const badLetters = require('g-detector').blocklist.join();
const detector = RegExp(`[${badLetters}]`, 'giu');
const count = require('../detector/counter');
const log = require('../detector/logger');

module.exports = {
  name: 'guildMemberUpdate',
  async execute(oldMember, newMember, client) {
    if (newMember.partial) {
      await newMember.fetch();
    }

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

    count(client, newMember.guild.id, newMember.id);
    log({ client, member: newMember, type: 'Nickname' });
  }
};
