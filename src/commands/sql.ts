import { inspect } from 'node:util';
import { ChatInputCommandBuilder } from '@discordjs/builders';
import { type ChatInputCommandInteraction, ComponentType, MessageFlags } from 'discord.js';
import type { Application } from '#classes';

export async function onChatInputCommand(client: Application, interaction: ChatInputCommandInteraction) {
  const method = interaction.options.getSubcommand(true);

  await interaction.deferReply({ flags: method === 'backup' ? MessageFlags.Ephemeral : undefined });

  if (method === 'backup') {
    return interaction.followUp({
      content: 'Backup complete',
      files: ['./database.db']
    });
  }

  const query = interaction.options.getString('query', true);

  let title: string;
  let output: string;

  try {
    const result = await client.prisma.$queryRawUnsafe(query);
    const clean = inspect(result, { depth: 1 });

    title = 'Done';
    output = `\`\`\`js\n${clean}\`\`\``;
  } catch (error) {
    const clean = inspect(error, { depth: 1 });

    title = 'Failed';
    output = `\`\`\`js\n${clean}\`\`\``;
  }

  return interaction.editReply({
    flags: MessageFlags.IsComponentsV2,
    components: [
      {
        type: ComponentType.Container,
        accentColor: client.color,
        components: [
          { type: ComponentType.TextDisplay, content: `# ${title}` },
          { type: ComponentType.Separator },
          { type: ComponentType.TextDisplay, content: output }
        ]
      }
    ]
  });
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
