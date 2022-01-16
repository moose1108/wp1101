import { User, Record} from "../Models/Record.js";
const Delete = async (req,res)=>{
    const {username, _id} = req.body;
    // console.log(req.body);
    let deleted;
    const user = await User.findOne({username}).populate('records');
    console.log(_id);
    console.log(user.records);
    user.records = await user.records.filter(item=> {
        if(item._id.toString() ===_id)
        {
            deleted = item;
            return false
        }
        else
            return true;
    })
    console.log("====================================")
    console.log(user.records);
    await Record.findByIdAndRemove(deleted._id);
    await user.save();
    res.send({Message:"Delete Success !",NewRecords:user.records});
}
export default Delete