const axios = require("axios");

module.exports = {
  name: "lyrics",
  bot: async (api, event, arg) => {
    const { messageID, threadID } = event;
    const srh = arg.join(' ');
    if (!srh) {
      api.sendMessage("Please add a title", threadID, messageID);
    } else {
      try {
        const resp = await axios.get(`https://lyrist.vercel.app/api/${srh}`);
        const { title, artist, lyrics, image } = resp.data;
        const img = await axios.get(image, { responseType: "stream" });
        api.sendMessage({
          body: `Title: ${title}\nArtist: ${artist}\n\n${lyrics}`,
          attachment: img.data,
        }, threadID, messageID);
      } catch (e) {
        api.sendMessage(e.message, threadID, messageID);
      }
    }
  }
};