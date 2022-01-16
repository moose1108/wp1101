import { User } from "../Models/Record.js";

const QueryAddress = async (req,res)=>{
    const {username,date_Y,status} = req.query;
    console.log(date_Y);
    console.log(status);
    const user = await User.findOne({username}).populate('records');
    //console.log(user)
    var NewRecords = await user.records.filter((item)=>{
        console.log(item);
        return item.date_Y === date_Y && item.address !=="" && item.status === status;
    })
    console.log(NewRecords);
    // console.log(NewRecords);
    res.send({NewRecords});
}
export default QueryAddress