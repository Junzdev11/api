const { cmdName } = require('../../src/utils');
module.exports = {
name: "help",
bot: async (api, event) => { 
const cmd = cmdName(__dirname + '/command');
api.sendMessage("Available Commands:\n" + cmd.map((name, n) => `${n + 1}: ${name}`).join('\n'), event.threadID);
}
};