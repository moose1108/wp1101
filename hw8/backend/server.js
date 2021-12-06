import { WebSocketServer } from 'ws';
import http from 'http';
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv-defaults";
import Message from "../backend/message.js";
import { sendData, sendStatus } from "./wssConnect.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,   
});

const db = mongoose.connection;
const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({server});

db.once('open', () => {
    wss.on('connection', (ws) =>{
        console.log("MangoDB connected!");
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
                    sendData(['output', [payload]], ws);
                    sendStatus({type: 'success', msg: 'Message sent.'}, ws);
                    break;
                }
                case 'clear': {
                    Message.deleteMany({}, () => {
                        sendData(['cleared']);
                        sendStatus({ type: 'info', msg: 'Message cache cleared.'});
                    })
                    console.log(2);
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