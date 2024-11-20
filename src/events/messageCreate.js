const CommandHandler = require('../commands/commandHandler.js');

const prefix = "";
const triggerResponses = [
  { trigger: "necesito ayuda", response: '**¿Necesitas ayuda?** Puedes preguntarme cualquier cosa con `/ia` !!', filter: false },
  { trigger: "tu mama", response: 'Es una gorda', filter: false },
]

module.exports = async (client, message) => {

  if (message.author.bot) return; 
  message.content.slice(1).split(' ')[0]
  const messageText = message.content;

  if (messageText[0] == prefix) {
    const command = messageText.split(" ");
    CommandHandler.execute(command[0].split(".")[1], message);
    return;
  }

  triggerResponses.forEach(({ trigger, response, filter }) => {
    if (filter) {
      if (messageText === trigger) {
        message.reply(response);
      }
    } else {
      if (messageText.toLowerCase().includes(trigger)) {
        message.reply(response);
      }
    }
  })

};
