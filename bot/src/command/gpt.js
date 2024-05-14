const axios = require('axios');
const convo = {};
module.exports = {
  name: "gpt",
  author: "Jun",
  description: "Ask anything",
  bot: async (arg, event, api) => {
    const { senderID, messageID, threadID } = event;
    try {
      if (arg[0] === "clear") {
        const id = senderID;
        convo[id] = [];
        api.sendMessage('Conversation reset successfully', threadID, messageID);
        return; 
      }
 const id = senderID;
      const key = process.env.key; 
      const prompt = arg.join(" ");
      const messages = convo[id] || [];
      messages.push({ role: 'user', content: prompt });
      const res = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: 'gpt-3.5-turbo',
        messages,
        stream: false
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${key}`
        }
      });
      convo[id] = messages.concat(res.data.choices.map(choice => choice.message));          api.sendMessage(res.data.choices[0].message.content, threadID, messageID);
    } catch (error) {
      api.sendMessage(error, threadID, messageID);
    }
  }
};
