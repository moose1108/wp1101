import Message from "./message.js";

const initData = (ws) => {
    Message.find().sort({created_at : -1}).limit(100).exec((err, res) => {
        if (err)
            throw err;
        sendData(['init', res], ws);
    })
}

const sendData = (data, ws) => {
    console.log(data);
    ws.send(JSON.stringify(data));
};

const sendStatus = (payload, ws) => {
    sendData(["status", payload], ws);
};

export { sendData, sendStatus, initData };