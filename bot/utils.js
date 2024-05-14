const cooldowns = {};
const load = (dir) => {
  return require("fs")
    .readdirSync(dir)
    .map((f) => {
      const file = require("path").join(dir, f);
      try {
        return require(file);
      } catch (error) {
        console.error(`Error loading command file ${file}: ${error}`);
      }
    })
    .filter(Boolean);
};
const cmdName = dir => {
  return load(dir).map(c => c.name);
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

module.exports = {
  load,
  create,
cmdName
};