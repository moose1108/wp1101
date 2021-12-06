import { useState } from "react";

const client = new WebSocket('ws://localhost:4000');

const useChat = () => {
    const sendData = async (data) => {
        await client.send(JSON.stringify(data));
    };
    const [messages, setMessages] = useState([]);
    const [status, setStatus] = useState({});
    const sendMessage = (payload) => {
        sendData(['input', payload]);
    }
    const clearMessages = () => {
        sendData(["clear"]);
    }
    client.onmessage = (byteString) => {
        const { data } = byteString;
        const [ task, payload ] = JSON.parse(data);
        switch(task){
            case 'output': {
                console.log(payload);
                setMessages(() => [...messages, ...payload]);
                break;
            }
            case 'status': {
                setStatus(payload);
                break;
            }
            case 'init': {
                setMessages(() => payload);
                break;
            }
            case 'cleared': {
                console.log(1);
                setMessages([]);
                break;
            }
            default:
                break;
        }
    }
    return { status, messages, sendMessage, clearMessages };
};

export default useChat;