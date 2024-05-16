const { help } = require('../load');
module.exports = {
    name: "help",
    author: "Jun",
    description: "Show available commands",
     async (api, event, arg) => { 
        try {
            if (arg.length === 0) {
       return api.sendMessage(await help(), event.threadID);
            } else {
        return api.sendMessage(await help(arg[0]), event.threadID, event.messageID);
            }
        } catch (error) {         
            return api.sendMessage(error.message, event.threadID, event.messageID);
        }
    }
};
