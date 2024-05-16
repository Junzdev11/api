module.exports = {
    name: "test",
    start: async (send, name, event) => {
      send("hi " + await name(event.senderID) + " this is a test command");
    }
};