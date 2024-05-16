const load = () => Object.fromEntries(
    fs.readdirSync(path.join(__dirname, 'commands'))
        .filter(f => f.endsWith('.js'))
        .map(f => [require(`./commands/${f}`).name, require(`./commands/${f}`)])
);
module.exports = load;
