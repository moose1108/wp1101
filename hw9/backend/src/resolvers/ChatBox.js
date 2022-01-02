const ChatBox = {
    messages(parent, args, { db }, info){
        return Promise.all(
            parent.messages.map(
                (mid) => db.MessageModel.findById(mid)
            )
        );
    },
};

export default ChatBox;