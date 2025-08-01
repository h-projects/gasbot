import { inspect } from 'node:util';
import {
  ChatInputCommandBuilder,
  type ChatInputCommandInteraction,
  codeBlock,
  EmbedBuilder,
  MessageFlags
} from 'discord.js';
import type { Application } from '#classes';

export async function onChatInputCommand(client: Application, interaction: ChatInputCommandInteraction) {
  const method = interaction.options.getSubcommand(true);

  await interaction.deferReply({ flags: method === 'backup' ? MessageFlags.Ephemeral : undefined });

  if (method === 'backup') {
    const backup = client.makeDatabaseBackup();
    return interaction.editReply({
      content: 'Backup complete',
      files: [backup]
    });
  }

  const query = interaction.options.getString('query', true);
  const embed = new EmbedBuilder().setColor(client.color);

  try {
    const result = await client.prisma.$queryRawUnsafe(query);
    const clean = inspect(result, { depth: 1 });

    embed.setTitle('Done').setDescription(codeBlock('js', clean));
  } catch (error) {
    const clean = inspect(error, { depth: 1 });

    embed.setTitle('Failed').setDescription(codeBlock('js', clean));
  }

  return interaction.editReply({ embeds: [embed] });
}

export const dev = true;

export const chatInputCommandData = new ChatInputCommandBuilder()
  .setName('sql')
  .setDescription('Execute SQL statements')
  .addSubcommands([
    command => command.setName('backup').setDescription('Make a local copy of the database'),
    command =>
      command
        .setName('query')
        .setDescription('Execute a query')
        .addStringOptions(option => option.setName('query').setDescription('Query to execute').setRequired(true))
  ])
  .toJSON();
