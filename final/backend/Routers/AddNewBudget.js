import { User, Budget } from "../Models/Record.js";

const AddNewBudget = async (req,res)=>{
    const { date_YM,username,type,cost } = req.body;
    const NewBudget = new Budget({ date_YM, type,cost})
    const user = await User.findOne({ username }) 
    await NewBudget.save();
    user.budgets.push(NewBudget);
    await user.save();
    res.send({ Message: 'Add Success' });
}
export default AddNewBudget