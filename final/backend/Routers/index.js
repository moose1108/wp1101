import express from "express"
import CreateUser from "./Register.js"
import QueryUser from "./Check.js"
import AddRecord from './AddRecord.js'
import QueryUserRecords from "./GetUserInformation.js"
import QueryPie from "./GetPieInformation.js"
import Delete from "./DeleteRecord.js"
import QueryBudget from './QueryBudget.js'
import AddNewBudget from "./AddNewBudget.js"
import QueryAddress from "./QueryAddress.js"
const Router = express.Router()
Router.post('/Register', (req, res) => { CreateUser(req, res) })
Router.get('/Check', (req, res) => { QueryUser(req, res) })
Router.post('/AddRecord', (req, res) => { AddRecord(req, res) })
Router.get('/GetUserInformation',(req, res)=>{QueryUserRecords(req,res)})
Router.get('/GetPieInformation',(req, res)=>{QueryPie(req,res)})
Router.post('/DeleteRecord',(req,res)=>{Delete(req,res)});
Router.get('/QueryBudget',(req,res)=>{QueryBudget(req,res)})
Router.post('/AddNewBudget',(req,res)=>{AddNewBudget(req,res)});
Router.get('/QueryAddress',(req,res)=>{QueryAddress(req,res)})
export default Router;