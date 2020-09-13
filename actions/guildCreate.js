module.exports = async (client, guild) => {
    
    let aytchLoqs = client.channels.cache.get("754681399499423764");
    let joinedEmbed = new client.disc.MessageEmbed()
            .setFooter("G.A.S Bot", `${client.config.botLogo}`)
            .setThumbnail(`${guild.iconURL()}`)
            .setTimestamp()
            .setColor("E74C3C")
            .setTitle(`Joined __${guild.name}__!`)
            .setDescription(`Just joined a server with **${guild.memberCount}** members!\nI'm in **${client.guilds.cache.size}** servers now!`)
    
            aytchLoqs.send(joinedEmbed);
    
};    
