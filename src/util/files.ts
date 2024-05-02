import { glob } from 'node:fs/promises';
import { join } from 'node:path';
import { env } from '#env';

const extension = env.NODE_ENV === 'production' ? '*.js' : '*.ts';

export function loadDirectory<T>(relativePath: string) {
  const files = glob(join(import.meta.dirname, relativePath, extension));

  return Array.fromAsync(files, async file => ({
    name: file.split(/\/|\.|\\/).at(-2) as string,
    data: (await import(`file://${file}`)) as T
  }));
}
