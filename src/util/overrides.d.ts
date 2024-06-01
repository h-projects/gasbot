// TODO: remove this file when @types/node gets updated to v22 and typescript 5.5 releases
declare module 'node:fs/promises' {
  export function glob(pattern: string): AsyncGenerator<string>;
}

declare interface ArrayConstructor {
  fromAsync<T>(
    iterableOrArrayLike: AsyncIterable<T> | Iterable<T | PromiseLike<T>> | ArrayLike<T | PromiseLike<T>>
  ): Promise<T[]>;

  fromAsync<T, U>(
    iterableOrArrayLike: AsyncIterable<T> | Iterable<T> | ArrayLike<T>,
    mapFn: (value: Awaited<T>) => U,
    thisArg?: unknown
  ): Promise<Awaited<U>[]>;
}

declare interface IterableIterator<T> {
  toArray(): T[];
}
