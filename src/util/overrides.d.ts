// TODO: remove this file once @types/node gets updated to v22
declare module 'node:fs/promises' {
  export function glob(pattern: string): AsyncGenerator<string>;
}
