module.exports = async (client, guildId, userId) => {
  // Update global count
  const { count } = client.db.prepare('SELECT count FROM global_data').get();
  client.db.prepare('UPDATE global_data SET count = ?').run(count + 1);

  // Update user count
  const userData = client.db.prepare('SELECT count FROM users WHERE id = ?').get(userId);
  const userStatement = userData ? 'UPDATE users SET count = @count WHERE id = @id' : 'INSERT INTO users (id, count) VALUES (@id, @count)';
  client.db.prepare(userStatement).run({ id: userId, count: (userData?.count ?? 1) + 1 });

  // Update guild count
  const guildData = client.db.prepare('SELECT count FROM guilds WHERE id = ?').get(guildId);
  const guildStatement = guildData ? 'UPDATE guilds SET count = @count WHERE id = @id' : 'INSERT INTO guilds (id, count) VALUES (@id, @count)';
  client.db.prepare(guildStatement).run({ id: guildId, count: (guildData?.count ?? 1) + 1 });
};
