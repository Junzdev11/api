const { parse } = JSON;
const fs = require('fs');
const path = require('path');
const bot = require("./load").load();
const express = require('express');
const app = express();
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
const prx = event.body ? event.body.toLowerCase() : "";
const pr = prx.split(" ")[0];
const arg = prx.split(" ").slice(1);
const name = async (id) => (await api.getUserInfo(id))[id].name;
        if (bot[pr]) {
            bot[pr].start(api, event, arg, name);
        }
    });
});
app.get('/', (req, res) => {
    res.send('<html><body><h1>Server is live</h1></body></html>');
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
