const axios = require('axios');
const fs = require("fs");
const path = require("path");

var msgData = {}; 

module.exports = async function(api, event) {
    if (event.type === 'message') {
        msgData[event.messageID] = {
            body: event.body, 
            attachments: event.attachments
        };
    }

    if (event.type === "message_unsend" && msgData.hasOwnProperty(event.messageID)) {
        try {
            const info = await api.getUserInfo(event.senderID);
            const name = info[event.senderID].name;

            if (msgData[event.messageID].attachments.length === 0) {
                api.sendMessage(`${name} unsent this message: ${msgData[event.messageID].body}`, event.threadID);  
            } else if (msgData[event.messageID].attachments[0].type === 'photo') {
                const photo = [];
                const del = [];
                for (const item of msgData[event.messageID].attachments) {
                    const { data } = await axios.get(item.url, { responseType: "arraybuffer" });
                    const filePath = path.resolve(__dirname, `./cache/${item.filename}.jpg`);
                    fs.writeFileSync(filePath, Buffer.from(data));
                    photo.push(fs.createReadStream(filePath));
                    del.push(filePath);
                }

                api.sendMessage({
                    body: `${name} unsent this photo: ${msgData[event.messageID].body}`,
                    attachment: photo
                }, event.threadID, () => {
                    for (const item of del) {
                        fs.unlinkSync(item);
                    }
                });
            } else if (msgData[event.messageID].attachments[0].type === 'audio') {
                const { data } = await axios.get(msgData[event.messageID].attachments[0].url, { responseType: "arraybuffer" });
                const audioPath = path.resolve(__dirname, './cache/audio.mp3');
                fs.writeFileSync(audioPath, Buffer.from(data));

                api.sendMessage({
                    body: `${name} unsent this voice message: ${msgData[event.messageID].body}`,
                    attachment: fs.createReadStream(audioPath)
                }, event.threadID, () => {
                    fs.unlinkSync(audioPath);
                });
            } else if (msgData[event.messageID].attachments[0].type === 'animated_image') {
                const { data } = await axios.get(msgData[event.messageID].attachments[0].previewUrl, { responseType: "arraybuffer" });
                const gifPath = path.resolve(__dirname, './cache/animated_image.gif');
                fs.writeFileSync(gifPath, Buffer.from(data));

                api.sendMessage({
                    body: `${name} unsent this gif: ${msgData[event.messageID].body}`,
                    attachment: fs.createReadStream(gifPath)
                }, event.threadID, () => {
                    fs.unlinkSync(gifPath);
                });
            }
        } catch (error) {
            console.error("Error handling message unsend:", error);
        }
    }
};
