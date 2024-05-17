
const cron = require('node-cron');
module.exports = function(api, gc) {
  if (gc.auto_greet) {
    cron.schedule('0 7,12,18,0 * * *', () => { 
      const hour = new Date().getHours();
      const greetings = {
        morning: ["Good Morning Everyone!", "Rise and Shine!", "Have a great day!"],
        afternoon: ["Good Afternoon!", "Happy midday!", "Hope your afternoon is awesome!"],
        evening: ["Good Evening!", "Relax and unwind!", "Enjoy your evening!"],
        night: ["Good Night!", "Sleep tight!", "Sweet dreams!"]
      };
      let greeting;
      if (hour >= 7 && hour < 12) {
        greeting = greetings.morning;
      } else if (hour >= 12 && hour < 18) {
        greeting = greetings.afternoon;
      } else if (hour >= 18 && hour < 24) {
        greeting = greetings.evening;
      } else {
        greeting = greetings.night; 
      }
      const msg = greeting[Math.floor(Math.random() * greeting.length)];
      api.getThreadList(100, null, ["INBOX"], (err, data) => {
        data.forEach(info => {
          if (info.isGroup && info.isSubscribed) { 
            api.sendMessage(msg, info.threadID);
          }
        });
      });
    }, {
      scheduled: true,
      timezone: "Asia/Manila"
    });
  }
};
