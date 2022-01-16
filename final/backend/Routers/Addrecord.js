import { User, Record } from "../Models/Record.js";
const AddRecord = async (req, res) => {
    const { date_Y, date_YM, date, record, username } = req.body;
    //console.log(record);
    const { status, type, content, cost,address } = record
    const NewRecord = new Record({ date_Y, date_YM, date, status, type, content, cost,address })
    //console.log(NewRecord);
    const user = await User.findOne({ username })
    // console.log(user);
    await NewRecord.save();
    user.records.push(NewRecord);
    await user.save();
    res.send({ Message: 'Add Success' });
}

export default AddRecord;