const count = require('../detector/counter');
const log = require('../detector/logger');

module.exports = {
  name: 'messageReactionAdd',
  async execute(reaction, user, client) {
    if (reaction.partial) {
      try {
        await reaction.fetch();
      } catch {
        return console.warn('Failed to fetch partial reaction');
      }
    }

    if (!reaction.message.channel.permissionsFor(client.user.id).has('MANAGE_MESSAGES') || reaction.emoji.name !== '🇬') {
      return;
    }

    reaction.remove();

    if (user.bot) {
      return;
    }

    const member = await reaction.message.guild.members.fetch(user);

    count(client, reaction.message.guildId, user.id);
    log({ client, member, reaction, type: 'Reaction' });
  }
};
