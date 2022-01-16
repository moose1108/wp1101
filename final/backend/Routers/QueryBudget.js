import {User} from '../Models/Record.js'

const QueryBudget = async (req,res)=>{
    const {username,YM} = req.query;
    const user = await User.findOne({username}).populate('budgets');
    var NewBudgets = await user.budgets.filter((item)=>{
        return item.date_YM === YM ;
    })
    res.send({NewBudgets})
}
export default QueryBudget;