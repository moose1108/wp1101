import mongoose from 'mongoose'

// Define schema
const Schema = mongoose.Schema;
const UserSchema = new Schema({   
    Name: String,
    Subject: String,
    Score: Number
}); 

// Compile model from schema
const ScoreCard = mongoose.model('ScoreCard', UserSchema);

export default ScoreCard;