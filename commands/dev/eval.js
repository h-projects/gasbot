module.exports = {
  name: 'eval',
  description: 'Evaluate code inside G.A.S Bot',

  async execute(client, message, args) {
    if (client.config.developers.includes(message.author.id)) {
      //   try {
      //     const evaled = eval(args.join(" "));
      //     message.channel.send({
      //       embeds: [
      //         {
      //           color: client.config.color,
      //           title: "Evaluated!",
      //           description: `\`\`\`js\n${evaled}\`\`\``
      //         }
      //       ]
      //     });
      //   } catch (error) {
      //     client.logger.log("red", error);
      //     message.reply({
      //       embeds: [
      //         {
      //           color: client.config.color,
      //           title: "Evaluation Error!",
      //           description: `\`\`\`js\n${error}\n\`\`\``
      //         }
      //       ]
      //     });
      //   }
      // }

      // Will be remade later, this is just to execute code

      if (client.config.owners.includes(message.author.id)) {
        let evaled;
        try {
          evaled = eval(args.join(' '));
        } catch (e) {
          evaled = e;
        }
        return message.channel.send({
          embeds: [
            {
              color: client.config.color,
              description: `\`\`\`js\n${evaled}\`\`\``
              // should we replace it to client.disc.Formatters.codeBlock('js', evaled.toString())? its cleaner
            }
          ]
        });
      }
    }
  }
};
