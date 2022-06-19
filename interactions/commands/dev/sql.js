const { SlashCommandBuilder } = require('@discordjs/builders');
const { inspect } = require('util');

module.exports = {
  async execute(client, interaction) {
    const method = interaction.options.getString('method');
    const query = interaction.options.getString('query');

    if (method === 'backup') {
      await client.db.backup(`./backup/backup-${Date.now()}.sqlite3`);
      return interaction.reply({
        embeds: [{
          title: 'SQL',
          description: 'Backup complete',
          color: client.config.color
        }],
        ephemeral: true
      });
    }

    try {
      const db = client.db.prepare(query);
      const result = method === 'run' ? db?.run() : db.get();
      interaction.reply({
        embeds: [{
          title: 'SQL',
          description: `\`\`\`js\n${inspect(result, { depth: 2 })}\`\`\``,
          color: client.config.color
        }],
        ephemeral: true
      });
    } catch (error) {
      interaction.reply({
        embeds: [{
          title: 'SQL',
          description: `\`\`\`js\n${error}\`\`\``,
          color: client.config.color
        }],
        ephemeral: true
      });
    }
  },

  data: new SlashCommandBuilder()
    .setName('sql')
    .setDescription('Execute SQL statements')
    .addStringOption(option => option
      .setName('method')
      .setDescription('Method to use')
      .setRequired(true)
      .addChoices({
        name: 'Backup', value: 'backup'
      }, {
        name: 'Get', value: 'get'
      }, {
        name: 'Run', value: 'run'
      })
    )
    .addStringOption(option => option
      .setName('query')
      .setDescription('Query to execute')
      .setRequired(false))
};
