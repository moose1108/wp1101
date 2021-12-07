import { WebSocketServer } from 'ws';
import http from 'http';
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv-defaults";
import Message from "../backend/message.js";
import { initData, sendData, sendStatus } from "./wssConnect.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,   
});

const db = mongoose.connection;
const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({server});

const broadcastMessage = (data, status) => {
    wss.clients.forEach((client) => {
        sendData(data, client);
        sendStatus(status, client);
    });
};

db.once('open', () => {
    wss.on('connection', (ws) =>{
        console.log("MangoDB connected!");
        initData(ws);
        ws.onmessage = async (byteString) => {
            const { data } = byteString;
            const [task, payload] = JSON.parse(data);
            switch (task){
                case 'input':{
                    const { name, body } = payload;
                    const message = new Message({ name, body }); // model
                    try{
                        await message.save();
                    }
                    catch(e){
                        throw new Error("Message db save error" + e);
                    }
                    broadcastMessage(["output", [payload]], {
                        type: 'success', 
                        msg: 'Message sent.'
                    });
                    //sendData(['output', [payload]], ws);
                    //sendStatus({type: 'success', msg: 'Message sent.'}, ws);
                    break;
                }
                case 'clear': {
                    Message.deleteMany({}, () => {
                        sendData(['cleared'], ws);
                        sendStatus({ type: 'info', msg: 'Message cache cleared.'}, ws);
                    })
                    break;
                }
                default:
                    break;
            }
        }
    });
    const port = process.env.PORT || 4000
    server.listen(port, () => {
        console.log(`Server is up on port ${port}.`);
    });
})