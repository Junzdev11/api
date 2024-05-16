const axios = require("axios");
module.exports = {
  name: "ai",
author: "Jun",
description: "Ask an ai",
   async (api, event, arg, name) => {
    const { messageID, threadID, senderID } = event; 
const name = await name(senderID);
    try {
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