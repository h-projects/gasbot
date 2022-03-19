module.exports = {
  name: 'messageReactionAdd',
  once: false,
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

    require('../detector/counter.js')(client, reaction.message.guildId, user.id);
    require('../detector/logger.js')({ client, member, reaction, type: 'Reaction' });
  }
};
