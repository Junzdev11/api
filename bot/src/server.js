const { load, create } = require("./utils"),
{ readFileSync: read } = require("fs"),
app = require('../../server'),
{ resolve } = require("path"),
{ parse } = JSON,
appState = parse(read('appstate.json', 'utf8'));
require("./fca").login({ appState }, async (err, api) => {
    if (err) return console.error(err);
    console.log("Logged in!");
    load(resolve(__dirname + "/module" + "/command")).forEach(command => {
   api.listenMqtt(async (err, event) => {
    if (err) return console.error(err);
    await create(command)(api, event);
        });
    });
});