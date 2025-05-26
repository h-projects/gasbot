import { createEnv } from 'typed-env';

export const env = createEnv({
  DISCORD_TOKEN: { type: 'string' },
  TOPGG_TOKEN: { type: 'string', optional: true },

  GUILD_LOGS: { type: 'string' },
  GLOBAL_DETECTOR_LOGS: { type: 'string' },
  TEST_GUILD: { type: 'string' },

  EMOJI_AYTCH_SOFTWARE: { parser: id => `<:aytch_software:${id}>` },
  EMOJI_BOT_DEV: { parser: id => `<:verified_bot_dev:${id}>` },
  EMOJI_DJS: { parser: id => `<:djs:${id}>` },
  EMOJI_GAS: { parser: id => `<:gas_logo:${id}>` },
  EMOJI_NODE: { parser: id => `<:node:${id}>` },
  EMOJI_NOG: { parser: id => `<:nog:${id}>` },

  SUPPORT_INVITE: { type: 'string' },
  GAS_INVITE: { type: 'string' },

  DOCS_LINK: { type: 'string' },

  NODE_ENV: { type: 'string', default: 'development', choices: ['development', 'production'] }
});
