const { load, create } = require("./utils"),
{ readFileSync: read } = require("fs"),
{ resolve } = require("path"), 
{ parse } = JSON,
login = require("./fb-chat-api/index"),
app = require ("./app"),
cmdDr = resolve(__dirname, "./command");
login({ appState: parse(read('appstate.json', 'utf8')) }, async (err, api) => { 
if (err) return console.error(err);
console.log("Logged in!");
load(cmdDr).forEach(command => {
const handle = create(command);
api.listenMqtt(async (err, event) => { 
if (err) return console.error(err);
await handle(api, event); 
});
});
});