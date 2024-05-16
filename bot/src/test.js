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
var pr = (event.body ? event.body.toLowerCase() : "").split(" ")[0];
const arg = event.body.split(" ").slice(1);
        if (bot[pr]) {
            bot[pr].start(api, event, arg);
        }
    });
});
