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

    if (result.length / cleanNickname.length < 0.75 || !newMember.manageable || !newMember.guild.me.permissions.has('MANAGE_NICKNAMES')) {
      return;
    }

    const newNickname = newMember.nickname.replace(detector, 'h');
    newMember.setNickname(newNickname);

    if (newMember.user.bot) {
      return;
    }

    require('../detector/counter.js')(client, newMember.guild.id, newMember.id);

    const logs = client.db.prepare('SELECT logs FROM guilds WHERE id = ?').get(newMember.guild.id)?.logs;
    const channel = newMember.guild.channels.cache.get(logs);

    if (!channel?.permissionsFor(client.user).has('SEND_MESSAGES') || !channel.viewable) {
      return;
    }

    channel?.send({
      embeds: [{
        title: 'G Removal',
        url: 'https://h-projects.github.io/app/fuck-g/',
        color: client.config.color,
        fields: [
          { name: 'Type', value: 'Nickname' },
          { name: 'User', value: `${newMember} (${newMember.id})` },
          { name: 'Nickname', value: newMember.nickname }
        ],
        thumbnail: {
          url: newMember.displayAvatarURL({ dynamic: true })
        }
      }]
    });
  }
};
