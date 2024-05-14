const fs = require('fs');
const path = require('path');
function getCommandNames(directory) {
  const files = fs.readdirSync(directory);
  const jsFiles = files.filter(file => file.endsWith('.js'));
  return jsFiles.map(file => path.basename(file, '.js'));
}
module.exports = {
  name: "help",
  bot: async (api, event) => { 
    const commandsDir = __dirname; // Same directory as the script
    const cmd = getCommandNames(commandsDir);
    api.sendMessage("Available Commands:\n" + cmd.map((name, n) => `${n + 1}: ${name}`).join('\n'), event.threadID);
  }
};
