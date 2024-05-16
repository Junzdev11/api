const axios = require("axios");
module.exports = {
  name: "ai",
  start: async (api, event, arg) => {
    const { messageID, threadID, senderID } = event; 
    try {
      const info = await api.getUserInfo(senderID);
      const name = info[senderID].name;

      const prm = arg.join(" ");    
      const r = await axios.post("https://test-ai-ihc6.onrender.com/api", {
        prompt: prm,
        apikey: "GayKey-oWHmMb1t8ASljhpgSSUI", 
        name: name,
        id: senderID
      });
      const av = r.data.av;
      let result = r.data.result.replace(/{name}/g, name).replace(/{pn}/g, `ai`); 

      if (av) {
        const data = await axios.get(av, { responseType: "stream" });
        api.sendMessage(
          {
            body: result,
            attachment: data.data,
            mentions: [{ id: senderID, tag: name }]
          },
          threadID,
          messageID
        );
      } else {
        api.sendMessage(result, threadID, messageID);
      }
    } catch (error) {
      api.sendMessage(error.message, threadID); 
    }
  }
}