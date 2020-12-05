module.exports = async (reaction, user) => {
    console.log(reaction.emoji.name)
    if (reaction.emoji.name == '🇬') {
    reaction.remove(user);     
    }

};
