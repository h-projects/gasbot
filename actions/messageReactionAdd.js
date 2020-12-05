module.exports = async (reaction, user) => {

    if (reaction.emoji.name == '🇬') {
    reaction.remove(user);     
    }

};