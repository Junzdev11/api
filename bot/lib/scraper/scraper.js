async function ytm(m) {
    try {
const search = await yt_search(m);
   const yturl = search.videos[0].url;
    const a = `https://tattered-lead-archaeopteryx.glitch.me/watch?v=${yturl}&audio=true`;
        const title = search.videos[0].title;
        const timestamp = search.videos[0].timestamp;
        return { result: `${title} ${timestamp}`, av: a };
    } catch (error) {
        throw new Error("Error occurred while searching music");
    }
}
module.exports = ytm;