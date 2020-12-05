module.exports = async (user, reaction) => {
    if (reaction.emoji.name == '🇬') {
    reaction.remove(user);     
    }

};
