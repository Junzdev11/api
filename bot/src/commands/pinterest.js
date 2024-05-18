const { pinterest } = require('../scraper');

module.exports = {
    name: "pinterest",
    author: "Jun",
    description: "Find image on Pinterest",
    load: async ({ event, api }) => {
        const { threadID, messageID, args } = event;
        const amount = parseInt(args[1]);
        const search = args.slice(2).join(" ");

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
                const images = await searchPinterest({ search, amount });
                api.sendMessage({
                    body: search,
                    attachment: images
                }, threadID, messageID);
            }
        }
    }
};
