import { User } from "../Models/Record.js";
import bcrypt from 'bcrypt'
import express from 'express'
const QueryUser = async (req,res) =>{
    const { username,password} = req.query;
    const user = await User.findOne({username});
    if(user)
    {   
        bcrypt.compare(password, user.password, function(err, res_) {
            if (res_) {
              console.log("login successfully");
              res.send({Message:'Login Success',status:true})
            }
            else {
              console.log("Wrong password");
              res.send({Message:'Password is not correct.Please retry again !',status:false})
            }
          })
    }
    else
    {
        res.send({Message:'Username is not correct.Please retry again !',status:false})
    }
}
export default QueryUser