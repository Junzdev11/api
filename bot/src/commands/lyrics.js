const axios = require("axios");
const { stream } = require ("../utils");
module.exports = {
  name: "lyrics",
author: "Jun",
description: "find lyrics song",
  start: async (api, event, arg) => {
    const { messageID, threadID } = event;
    const srh = arg.join(' ');
    if (!srh) {
      api.sendMessage("Please add a title", threadID, messageID);
    } else {
      try {
const resp = await axios.get(`https://lyrist.vercel.app/api/${srh}`);
 const { title, artist, lyrics, image } = resp.data;
        api.sendMessage({
         body: `Title: ${title}\nArtist: ${artist}\n\n${lyrics}`,
          attachment: await stream(image),
        }, threadID, messageID);
      } catch (e) {
        api.sendMessage(e.message, threadID, messageID);
      }
    }
  }
};