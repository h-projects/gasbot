import { readdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath, type URL } from 'node:url';

/**
 * Call with `import.meta.url` to get the `__filename` equivalent
 */
export function getFilename(url: URL | string) {
  return fileURLToPath(url);
}

/**
 * Call with `import.meta.url` to get the `__dirname` equivalent
 */
export function getDirname(url: URL | string) {
  return dirname(getFilename(url));
}

export async function loadDirectory<T>(relativePath: string) {
  const directory = join(getDirname(import.meta.url), relativePath);

  const files = await readdir(directory);

  const result = [];

  for (const file of files) {
    const loadedFile = await loadFile<T>(directory, file);

    if (loadedFile) {
      result.push(loadedFile);
    }
  }

  return result;
}

export async function loadFile<T>(directory: string, file: string) {
  if (!file.endsWith('.js') && !file.endsWith('.ts')) {
    return;
  }

  const [name] = file.split('.');
  const data = (await import(`file://${join(directory, file)}`)) as T;
  return { name, data };
}
