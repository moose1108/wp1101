import { useState } from "react";

const useChatBox = () => {
    const [chatBoxes, setChatBoxes] = useState([]);
    const createChatBox = (friend) => {
        if (chatBoxes.some((name) => name === friend))
            throw new Error(friend + "'s chatBox has already opened.");
        setChatBoxes([...chatBoxes, friend]);
        return friend;
    }
    const removeChatBox = (targetKey, activeKey) => {
        const index = chatBoxes.indexOf(activeKey);
        const newChatBoxes = chatBoxes.filter((name) => name !== targetKey);
        setChatBoxes(newChatBoxes);
        return activeKey 
        ? activeKey === targetKey 
            ? index === 0 
                ? '' 
                : chatBoxes[index - 1]
            : activeKey
        : "";
    };
    return { chatBoxes, createChatBox, removeChatBox };
};

export default useChatBox;