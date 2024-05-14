const { load, create } = require("../../utils"),
{ readFileSync: read } = require("fs"),
app = require('../../server'),
{ resolve } = require("path"),
{ parse } = JSON,
appState = parse(read('appstate.json', 'utf8'));
require("./fca/index")({ appState }, async (err, api) => {
    if (err) return console.error(err);
api.setOptions({
        listenEvents: false,
        selfListen: false,
  forceLogin: true,
        autoMarkDelivery: false,
        autoMarkRead: false,
      userAgent:"Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36"
      });
    console.log("Logged in!");
    load(resolve(__dirname, "./command")).forEach(command => {
   api.listenMqtt(async (err, event) => {
    if (err) return console.error(err);
    await create(command)(api, event);
        });
    });
});