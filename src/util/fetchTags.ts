import type { Application } from '#classes';

export function fetchTags(client: Application, ids: string[]) {
  return Promise.all(ids.map(async id => (await client.users.fetch(id)).tag));
}
