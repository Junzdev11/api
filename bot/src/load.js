const path = require("path");
const axios = require ("axios");
const fs = require('fs').promises;
const path = require('path');
const load = async () => {
  const cmds = {};
  try {
    const files = await fs.readdir(path.join(__dirname, 'commands'));
    for (const file of files) {
      if (file.endsWith('.js')) {
        try {
          const cmd = require(`./commands/${file}`);
          if (cmd.load) {
            cmds[cmd.name] = cmd;
            if (cmd.otherName && Array.isArray(cmd.otherName)) {
              for (const alias of cmd.otherName) {
                cmds[alias] = cmd;
              }
            }
          } else {
            console.log(`\x1b[32mCommand ${cmd.name} missing load function.`);
          }
        } catch (error) {
          console.log(`\x1b[32mUnable to load command ${file}\n error: ${error.message}`);
        }
      }
    }
  } catch (error) {
    console.log(`\x1b[32m${error.message}`);
  }
  return cmds;
};

async function help(commandName) {
  const commandPath = path.join(__dirname, 'commands');
  const files = fs.readdirSync(commandPath);
  if (commandName) {
    for (const file of files) {
      const filePath = path.join(commandPath, file);
      const command = require(filePath);
      if (command.name === commandName) {
        return `Name: ${command.name}\nAuthor: ${command.author || ""}\nDescription: ${command.description || ""}`;
      }
    }
    return `Command ${commandName} doesn't exist`;
  } else {
    const cmd = [];
    files.forEach(file => {
      const filePath = path.join(commandPath, file);
      if (fs.lstatSync(filePath).isFile()) {
        const filee = require(filePath);
        if (filee && filee.name) {
          cmd.push(filee.name);
        }
      }
    });
   let result = "Here's all available commands:\n";
    cmd.forEach((name, i) => {
      result += `${i + 1}. ${name}\n`;
    });
    return result;
  }
}
async function stream(url) {
  try {
    const response = await axios.get(url, { responseType: "stream" });
    return response.data;
  } catch (error) {
    throw new Error(`${error.message}`);
  }
}

module.exports = {
 load,
help,
stream
};
