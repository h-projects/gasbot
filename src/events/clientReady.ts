import process from 'node:process';
import type { Application } from '#classes';
import { env } from '#env';
import { logger } from '#util';

export async function run(client: Application<true>) {
  if (process.argv.includes('--deploy')) {
    await client.deployCommands();
    process.exit(0);
  }

  logger.log('Ready!');

  if (env.NODE_ENV === 'production' && env.TOPGG_TOKEN) {
    setInterval(
      async () => {
        const response = await fetch(`https://top.gg/api/bots/${client.user.id}/stats`, {
          method: 'POST',
          headers: {
            Authorization: env.TOPGG_TOKEN ?? '',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ server_count: client.guilds.cache.size })
        });

        if (!response.ok) {
          logger.warn(`Failed to update top.gg stats, status code ${response.status}`);
        }
      },
      30 * 60 * 1000
    );
  }
}
