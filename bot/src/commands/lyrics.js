const axios = require("axios");
const { stream } = require("../load");
module.exports = {
  name: "lyrics",
  author: "Jun",
  description: "Find song lyrics",
  load: async ({arg, send}) => {
    const srh = arg.join(' ');
    if (!srh) {
      send("Please add a title");
    } else {
      try {
        const resp = await axios.get(`https://lyrist.vercel.app/api/${srh}`);
        const { title, artist, lyrics, image } = resp.data;
        send({
          body: `Title: ${title}\nArtist: ${artist}\n\n${lyrics}`,
          attachment: await stream(image),
        });
      } catch (e) {
        send(e.message);
      }
    }
  }
};
