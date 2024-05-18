const fs = require('fs');
const path = require('path');
const { handle_event, handle_cmd } = require("./load");
const bot = await handle_cmd();
const config = require('./config');
const express = require('express');
const app = express();
const appState = JSON.parse(fs.readFileSync(path.join(__dirname, 'appstate.json'), 'utf8'));
require("./fca/index")({ appState }, async (err, api) => {
    if (err) {
        console.error(err);
        return;
    }
    api.listenMqtt(async (err, event) => {
        if (err) {
            console.error(err);
            return;
        }
const send = async (msg) => {
      await api.sendMessage(msg, event.threadID, event.messageID);
    };
const gc = config.gc;
if (await handle_event(api, event, gc)) {}
var prx = event.body ? event.body.toLowerCase() : "";
var pr = prx.split(" ")[0];
var arg = prx.split(" ").slice(1);
const name = async (id) => {
const info = await api.getUserInfo(id);
  return info[id].name;
};
   if (bot[pr]) {
  bot[pr].load({api, event, arg, name, send});
        }
    });
});
app.get('/', (req, res) => {
res.send('<html><body><h1>this is a test only</h1></body></html>');
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
