const axios = require('axios').default; // npm install axios
const CryptoJS = require('crypto-js'); // npm install crypto-js
const moment = require('moment'); // npm install moment


const config = {
    app_id: process.env.APP_ID,
    key1: process.env.KEY1,
    key2: process.env.KEY2,
    endpoint: "https://sb-openapi.zalopay.vn/v2/query",


};

const payment = async (req, res) => {
    const embed_data = {
        redirecturl: process.env.CLIENT_URL

    };

    const items = [{}];
    const transID = Math.floor(Math.random() * 1000000);
    const order = {
        app_id: config.app_id,
        app_trans_id: `${moment().format('YYMMDD')}_${transID}`, // translation missing: vi.docs.shared.sample_code.comments.app_trans_id
        app_user: "user123",
        app_time: Date.now(), // miliseconds
        item: JSON.stringify(items),
        embed_data: JSON.stringify(embed_data),
        amount: 50000,
        description: `Lazada - Payment for the order #${transID}`,
        bank_code: "",
    };
    // // appid|app_trans_id|appuser|amount|apptime|embeddata|item
    // const data = config.app_id + "|" + order.app_trans_id + "|" + order.app_user + "|" + order.amount + "|" + order.app_time + "|" + order.embed_data + "|" + order.item;
    // order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();
    const data = [
        config.app_id,
        order.app_trans_id,
        order.app_user,
        order.amount,
        order.app_time,
        encodeURI(order.embed_data),
        encodeURI(order.item)
    ].join('|');

    // Tạo chữ ký HMAC
    order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

    console.log(order.mac);
    try {
        const result = await axios.post(config.endpoint, null, { params: order });
        return res.status(200).json(result.data);
    } catch (error) {
        console.error('Error:', error.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}


module.exports = {
    payment
}