import { User } from "../Models/Record.js";
import bcrypt from 'bcrypt'
const CreateUser = async (req,res)=>{
    const { username,password } = req.body;
    const  Username= await User.findOne( {username});
    if(Username)
    {   
        console.log(Username);
        res.send({Message:'Username exists.Please retry again !',status:false})
    }
    else
    {
        const Passowrd = await User.findOne({password});
        if(Passowrd)
        {
            res.send({Message:'Password exists.Please retry again !',status:false})
        }
        else
        {
            const newUser = new User({username,password,records:[],budgets:[]});
            const saltRounds = 10
            bcrypt.genSalt(saltRounds,  function(err, salt) {
                bcrypt.hash(newUser.password, salt,async function(err, hash) {
                newUser.password = hash;
                await newUser.save();
                })
            })
            res.send({Message:'Register Success !',status:true})
        }
    }
}

export default CreateUser