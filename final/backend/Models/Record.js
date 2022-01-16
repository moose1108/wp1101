import  mongoose  from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username:String,
    password:String,
    records: [{ type: mongoose.Types.ObjectId, ref: "Record" }],
    budgets:[{type: mongoose.Types.ObjectId, ref: "Budget" }],
})
const RecordSchema = new Schema({
    date_Y : String,
    date_YM : String,
    date:String,
    status:String, 
    type:String, 
    content:String, 
    cost: Number,
    address:String,
})
const BudgetSchema = new Schema({
    date_YM : String,
    type:String,
    cost:Number
})
const User = mongoose.model('User',UserSchema)
const Record = mongoose.model('Record',RecordSchema)
const Budget = mongoose.model('Budget',BudgetSchema)
export {User,Record,Budget}