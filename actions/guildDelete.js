module.exports = async (client, guild) => {
    let aytchLoqs = client.channels.cache.get("754681399499423764");
    let leftEmbed = new client.disc.MessageEmbed()
        .setFooter("G.A.S Bot", client.user.avatarURL({ dynamic: true }))
        .setThumbnail(guild.iconURL({ dynamic: true }))
        .setTimestamp()
        .setColor("E74C3C")
        .setTitle(`Left ${guild}`)
        .setDescription(`Just left a server with ${guild.memberCount} members\nI'm in ${client.guilds.cache.size} servers now!`);

    aytchLoqs.send(leftEmbed);
};
