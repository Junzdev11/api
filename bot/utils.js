var path = require("path");
var fs = require("fs");
const cooldowns = {};
const load = (dir) => {
  return fs.readdirSync(dir).map((f) => {
 const file = path.join(dir, f);
      try {
        return require(file);
      } catch (error) {
        console.error(`Error loading command file ${file}: ${error}`);
      }
    })
    .filter(Boolean);
};

const create = (command) => async (api, event) => {
  const cooldownTime = command.cooldown || 0; 
  const now = Date.now();
  const cooldownEnd = cooldowns[command.name] || 0;
  if (now < cooldownEnd) {
    const remainingTime = Math.ceil((cooldownEnd - now) / 1000);
    api.sendMessage(`Please wait ${remainingTime} seconds before using the "${command.name}" command again.`, event.threadID, event.messageID);
    return;
  }
  if (event.body?.toLowerCase()?.startsWith(command.name.toLowerCase())) {
    const arg = event.body.split(" ").slice(1);
    await command.bot(api, event, arg);
    cooldowns[command.name] = now + cooldownTime * 1000; 
  }
};
function help() {
  const f = path.join(__dirname, 'command');
    const files = fs.readdirSync(f);
    const cmd = [];
  files.forEach(file => {
   const file = path.join(f, file);
        if (fs.lstatSync(file).isFile()) {
    const filee = require(file);
    if (filee && filee.name) {
     cmd.push(filee.name);
            }
        }
    });
    let result = "Here's all available commands:\n";   cmd.forEach((name, i) => {
        result += `${i + 1}. ${name}\n`;
    });
 return results;
}
module.exports = {
  load,
  create,
help
};