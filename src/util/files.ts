import { glob } from 'node:fs/promises';
import { basename, join } from 'node:path';
import { env } from '#env';

const extension = env.NODE_ENV === 'production' ? '.js' : '.ts';

export async function* loadDirectory<T>(relativePath: string) {
  const files = glob(join(import.meta.dirname, relativePath, `*${extension}`));

  for await (const file of files) {
    yield {
      name: basename(file, extension),
      data: (await import(`file://${file}`)) as T
    };
  }
}
