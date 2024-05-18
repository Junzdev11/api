const { pinterest } = require('../scraper');

module.exports = {
    name: "pinterest",
    author: "Jun",
    description: "Find image on Pinterest",
    load: async (event, api, arg) => {
        const { threadID, messageID } = event;
        const amount = parseInt(arg[1]);
        const search = arg.slice(2).join(" ");
        if (!search || !amount || isNaN(amount)) {
      return api.sendMessage(
                "Invalid usage. Please use:\n" +
                `${p}pinterest [amount 1-9] [query]\n` +
                "Example:\n" +
                `${p}pinterest 6 cat`, threadID, messageID);
        } else {
            if (amount > 9) {
                return api.sendMessage("Sorry, the maximum amount is 9 only", threadID, messageID);
            } else {
                const images = await pinterest({ search, amount });
                api.sendMessage({
                    body: search,
                    attachment: images
                }, threadID, messageID);
            }
        }
    }
};
