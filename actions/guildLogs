module.exports = async (before, after) => {

// Joined loq
client.on("guildCreate", guild => {
let aytchLoqs = client.channels.cache.get("754681399499423764");
let joinedEmbed = new client.disc.MessageEmbed()
        .setFooter("G.A.S Bot", `${client.config.botLogo}`)
        .setThumbnail(`${guild.iconURL()}`)
        .setTimestamp()
        .setColor("E74C3C")
        .setTitle(`Joined __${guild.name}__!`)
        .setDescription(`Just joined a server with **${guild.memberCount}** members!\nI'm in **${client.guilds.cache.size}** servers now!`)

        aytchLoqs.send(joinedEmbed);
});

// Left loq
client.on("guildDelete", guild => {
let aytchLoqs = client.channels.cache.get("754681399499423764");
let leftEmbed = new client.disc.MessageEmbed()
        .setFooter("G.A.S Bot", `${client.config.botLogo}`)
        .setThumbnail(`${guild.iconURL()}`)
        .setTimestamp()
        .setColor("E74C3C")
        .setTitle(`Left ${guild.name}`)
        .setDescription(`Just left a server with ${guild.memberCount} members\nI'm in ${client.guilds.cache.size} servers now`)

        aytchLoqs.send(leftEmbed);
});

};
