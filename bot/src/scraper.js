const axios = require("axios");

async function searchPinterest({ search, amount }) {
    try {
        const headers = {
            'authority': 'www.pinterest.com',
            'cache-control': 'max-age=0',
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
            'upgrade-insecure-requests': '1',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
            'sec-gpc': '1',
            'sec-fetch-site': 'same-origin',
            'sec-fetch-mode': 'same-origin',
            'sec-fetch-dest': 'empty',
            'accept-language': 'en-US,en;q=0.9',
            'cookie': 'csrftoken=92c7c57416496066c4cd5a47a2448e28; g_state={"i_l":0};1'
        };

        const options = {
            url: 'https://www.pinterest.com/search/pins/?q=' + search + '&rs=typed&term_meta[]=' + search + '%7Ctyped',
            headers: headers
        };

        const response = await axios.get(options.url);

        if (response.status === 200) {
            const arrMatch = response.data.match(/https:\/\/i\.pinimg\.com\/originals\/[^.]+\.jpg/g);
            const imageUrls = arrMatch.slice(0, amount).map(item => ({ url: item }));
            const images = await Promise.all(imageUrls.map(async (item) => {
                const image = await axios.get(item.url, { responseType: 'stream' });
                image.data.path = `${Date.now()}.png`;
                return image.data;
            }));

            return images;
        }
    } catch (error) {
        throw error;
    }
}

module.exports = searchPinterest;
