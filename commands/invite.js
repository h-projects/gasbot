exports.run = async (client, message, args) => {
  let cmd = client.cmds.get('links');
  cmd.run(client, message, args);
};
