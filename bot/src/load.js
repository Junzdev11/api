const fs = require("fs");
const path = require("path");
const axios = require ("axios");
const load = () => {
    return Object.fromEntries(
        fs.readdirSync(path.join(__dirname, 'commands'))
            .filter(f => f.endsWith('.js'))
            .map(f => {
                const cmd = require(`./commands/${f}`);
                return [cmd.name, cmd];
            })
    );
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
