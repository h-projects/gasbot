module.exports = async (reaction, user) => {

    let emoji = reaction.emoji;

    if (emoji.name == '🇬') {
    reaction.remove(user);     
    }

};