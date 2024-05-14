const app = require("express")();
async function restart() {
  console.log('Restarting...');
  await new Promise(resolve => setTimeout(resolve, 1000));
  process.exit(0);
}
app.get('/restart', async (req, res) => {
await restart();
res.send('Server restarting...');
});
app.listen(3000, () => {
console.log(`Server is live`);
});
module.exports = app;
