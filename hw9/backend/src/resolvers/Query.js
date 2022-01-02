import { makeName } from "./Utility";

const Query = {   
    chatBox(parent, { name1, name2 }, { db, pubsub }, info){
        const chatBoxName = makeName(name1, name2);
        console.log(chatBoxName);
        return db.ChatBoxModel.findOne({ name: chatBoxName });
      }
};

export default Query;