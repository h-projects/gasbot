import 'dotenv/config';
import { createEnv } from 'neon-env';

export const env = createEnv({
  DISCORD_TOKEN: { type: 'string' },
  TOPGG_TOKEN: { type: 'string' },

  GUILD_LOGS: { type: 'string' },
  GLOBAL_DETECTOR_LOGS: { type: 'string' },
  TEST_GUILD: { type: 'string' },

  SUPPORT_INVITE: { type: 'string' },
  GAS_INVITE: { type: 'string' },

  DOCS_LINK: { type: 'string' },

  NODE_ENV: { type: 'string', default: 'development', choices: ['development', 'production'] },

  // Injected by npm
  npm_package_version: { type: 'string' }
});
