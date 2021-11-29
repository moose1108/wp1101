import mongoose from "mongoose";
import dotenv from "dotenv-defaults";

dotenv.config();
// connect to database
mongoose.connect(process.env.MONGO_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })

//Get mongoose.connect()'s connection object
const db = mongoose.connection;

//first perameter : state of db 
db.on("error", function(err){
    console.log("Mongoose Error: ", err);
  }); 
db.once("open", function(){
    console.log("Mongoose connection successful.");
});

