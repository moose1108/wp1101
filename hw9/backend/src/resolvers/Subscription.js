import { makeName } from "./Utility";

const Subscription = {
  message:{
    async subscribe(parent, { from, to }, {db, pubsub }, info){
        const chatBoxName = makeName(from, to);
        const chatBox = await db.ChatBoxModel.findOne({ name: chatBoxName })
        if (!chatBox)
            throw new Error("They aren't familiar with each other.");
        return pubsub.asyncIterator(`chatBox ${chatBoxName}`);
    }
  }
};

export default Subscription;
