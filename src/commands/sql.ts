import { inspect } from 'node:util';
import type { Application } from '#classes';
import {
  type ChatInputCommandInteraction,
  codeBlock,
  EmbedBuilder,
  SlashCommandBuilder,
  SlashCommandSubcommandBuilder
} from 'discord.js';

export async function onSlashCommand(client: Application, interaction: ChatInputCommandInteraction) {
  const method = interaction.options.getSubcommand(true);

  await interaction.deferReply({ ephemeral: method === 'backup' });

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

export const slashCommandData = new SlashCommandBuilder()
  .setName('sql')
  .setDescription('Execute SQL statements')
  .addSubcommand(
    new SlashCommandSubcommandBuilder().setName('backup').setDescription('Make a local copy of the database')
  )
  .addSubcommand(
    new SlashCommandSubcommandBuilder()
      .setName('query')
      .setDescription('Execute a query')
      .addStringOption(option => option.setName('query').setDescription('Query to execute').setRequired(true))
  );
