import process from 'node:process';
import type { Application } from '#classes';
import { logger } from '#util';

export async function run(client: Application) {
  if (process.argv.includes('--deploy')) {
    await client.deployCommands();
    process.exit(0);
  }
  logger.log('Ready!');
}
