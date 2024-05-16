const { parse } = JSON;
const fs = require('fs');
const path = require('path');
const bot = require("./load")();
const appState = parse(fs.readFileSync(path.join(__dirname, 'appstate.json'), 'utf8'));
const fca = require("./fca/index");

fca({ appState }, async (err, api) => {
    if (err) {
        console.error(err);
        return;
    }

    api.listenMqtt(async (err, event) => {
        if (err) {
            console.error(err);
            return;
        }
var prx = event.body ? event.body.toLowerCase() : "";
  var pr = prx.split(" ")[0];   
        if (bot[pr]) {
            bot[pr].start(api, event);
        }
    });
});
