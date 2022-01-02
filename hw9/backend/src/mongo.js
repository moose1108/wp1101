import mongoose from "mongoose";
import dotenv from "dotenv-defaults";

export default () => {
    dotenv.config();

    mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,   
    });

    const db = mongoose.connection;

    db.on("error", (error) => {
        throw new Error("DB connection error: " + error);
    })

    db.once('open', () => {
        console.log("MongoDB connected!");
    })
}

