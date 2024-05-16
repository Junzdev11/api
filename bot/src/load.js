const load = () => Object.fromEntries(
    fs.readdirSync(path.join(__dirname, 'commands'))
        .filter(f => f.endsWith('.js'))
        .map(f => {
            const cmd = require(`./commands/${f}`);
            return [cmd.name, cmd];
        })
);

module.exports = load;