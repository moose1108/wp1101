import { User } from "../Models/Record.js";

const QueryPie = async (req,res)=>{
    const {username,YM,status} = req.query;
    const user = await User.findOne({username}).populate('records');
    // console.log(user.records);
    var NewRecords = await user.records.filter((item)=>{
        return item.date_YM === YM && item.status === status;
    })
    // console.log(NewRecords);
    res.send({NewRecords});
}
export default QueryPie