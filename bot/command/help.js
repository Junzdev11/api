const { help, cmdHelp } = require('../../utils');

module.exports = {
    name: "help",
    author: "Jun",
    description: "Show available commands",
    bot: async (api, event, arg) => { 
        try {
            if (arg[0]) {
   api.sendMessage(help(), event.threadID);
      } else {
     const cmd = await cmdHelp(arg[1]);
     api.sendMessage(cmd, event.threadID, event.messageID);
            }
        } catch (error) {
     api.sendMessage(error.message, event.threadID, event.messageID);
        }
    }
};
