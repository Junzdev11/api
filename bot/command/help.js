const { help } = require('../../utils');
module.exports = {
name: "help",
bot: async (api, event) => { 
api.sendMessage(help(), event.threadID);
}
};