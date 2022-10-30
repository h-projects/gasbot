import process from 'node:process';
import { type Application, Logger } from '#classes';

export async function run(client: Application) {
  if (process.argv.includes('--deploy')) {
    await client.deployCommands();
    process.exit(0);
  }
  Logger.log('Ready!');
}
