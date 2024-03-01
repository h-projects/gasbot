import { readdir } from 'node:fs/promises';
import { join } from 'node:path';

export async function loadDirectory<T>(relativePath: string) {
  const directory = join(import.meta.dirname, relativePath);

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
