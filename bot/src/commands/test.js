module.exports = {
    name: "test",
    start: async (api, event) => {
        const { threadID } = event;
        api.sendMessage("test", threadID);
    }
};