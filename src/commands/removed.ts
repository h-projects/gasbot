import type { Application } from '#classes';
import {
  ApplicationCommandType,
  type CommandInteraction,
  ContextMenuCommandBuilder,
  SlashCommandBuilder
} from 'discord.js';

export async function onCommand(client: Application, interaction: CommandInteraction<'cached'>) {
  const member = interaction.options.getMember('user') ?? interaction.member;
  const user = interaction.options.getUser('user');

  if ((!member && user) || member.user.bot) {
    return interaction.reply({
      embeds: [
        {
          title: 'Invalid User',
          description: 'You need to mention a valid user!',
          color: client.color
        }
      ],
      ephemeral: true
    });
  }

  const { count: globalCount } = await client.prisma.global.findFirstOrThrow({
    select: { count: true }
  });

  const { count: userCount } = await client.prisma.user.upsert({
    select: { count: true },
    where: {
      id: BigInt(member.user.id)
    },
    create: {
      id: BigInt(member.user.id)
    },
    update: {}
  });

  const { count: guildCount } = await client.prisma.guild.upsert({
    select: { count: true },
    where: {
      id: BigInt(interaction.guildId)
    },
    create: {
      id: BigInt(interaction.guildId)
    },
    update: {}
  });

  return interaction.reply({
    embeds: [
      {
        title: 'Bad Letters Removed',
        color: client.color,
        description: `Removed ${globalCount} bad letters in total`,
        fields: [
          { name: 'Server', value: `Removed ${guildCount ?? 0} bad letters in this server` },
          { name: 'User', value: `Removed ${userCount ?? 0} bad letters from ${member}` }
        ]
      }
    ]
  });
}

export const slashCommandData = new SlashCommandBuilder()
  .setName('removed')
  .setDescription('Check how many bad letters were removed')
  .setDMPermission(false)
  .addUserOption(option => option.setName('user').setDescription('User to check').setRequired(false));

export const contextMenuCommandData = new ContextMenuCommandBuilder()
  .setName('Removed Count')
  .setDMPermission(false)
  .setType(ApplicationCommandType.User);
