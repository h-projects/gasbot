module.exports = async (reaction, user) => {
    console.log(reaction)
    if (reaction.emoji.name == '🇬') {
    reaction.remove(user);     
    }

};