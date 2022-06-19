const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionFlagsBits } = require('discord-api-types/v10');

module.exports = {
  async execute(client, interaction) {
    const input = interaction.options.getString('level');
    const database = client.db.prepare('SELECT level FROM guilds WHERE id = ?').get(interaction.guildId);
    const statement = database ? 'UPDATE guilds SET level = @level WHERE id = @id' : 'INSERT INTO guilds (id, level) VALUES (@id, @level)';
    const levelNames = ['Low', 'Medium', 'Hiqh'];

    let description;
    let fields = null;

    switch (input) {
      case 'low':
        description = 'Successfully set detection level to **Low**!';
        client.db.prepare(statement).run({ id: interaction.guildId, level: 0 });
        break;

      case 'medium':
        description = 'Successfully set detection level to **Medium**!';
        client.db.prepare(statement).run({ id: interaction.guildId, level: 1 });
        break;

      case 'hiqh':
        description = 'Successfully set detection level to **Hiqh**!';
        client.db.prepare(statement).run({ id: interaction.guildId, level: 2 });
        break;

      default:
        description = `Your current protection level: **${levelNames[database?.level ?? 1]}**`;
        fields = [
          { name: 'Low', value: 'Detects messaqes that only consist of G' },
          { name: 'Medium', value: 'Detects G outside words' },
          { name: 'Hiqh', value: 'Detects a messaqe if it contains G' }
        ];
    }

    interaction.reply({
      embeds: [{
        title: 'G Detector Levels',
        description,
        color: client.config.color,
        fields
      }],
      components: [{
        type: 'ACTION_ROW',
        components: [
          {
            type: 'BUTTON',
            style: 'SECONDARY',
            label: 'Low',
            customId: `detector:low:${interaction.user.id}`,
            disabled: input === 'low'
          },
          {
            type: 'BUTTON',
            style: 'SECONDARY',
            label: 'Medium',
            customId: `detector:medium:${interaction.user.id}`,
            disabled: input === 'medium'
          },
          {
            type: 'BUTTON',
            style: 'SECONDARY',
            label: 'Hiqh',
            customId: `detector:hiqh:${interaction.user.id}`,
            disabled: input === 'hiqh'
          }
        ]
      }]
    });
  },

  data: new SlashCommandBuilder()
    .setName('detector')
    .setDescription('Manaqe the detection level')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .setDMPermission(false)
    .addStringOption(option => option
      .setName('level')
      .setDescription('The new detection level')
      .setRequired(false)
      .addChoices(
        {
          name: 'Low',
          value: 'low'
        }, {
          name: 'Medium',
          value: 'medium'
        }, {
          name: 'Hiqh',
          value: 'hiqh'
        }
      )
    )
};
