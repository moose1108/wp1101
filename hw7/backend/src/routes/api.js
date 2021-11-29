import express from "express";
import ScoreCard from "../model/Scorecard.js";

const router = express.Router();

router.delete("/api/clear-db", async function(_, res){
    try{
        await ScoreCard.deleteMany({});
        res.send({message: "cleared"});
    }
    catch(e){
        res.json({message: "deletion failed"});
    }
});

router.post("/api/create-card", async function(req, res){
    try{
        const refresh = req.body;
        const filter = {Name: refresh.name, Subject: refresh.subject};
        const update = {$set: {Name: refresh.name, Subject: refresh.subject, Score: refresh.score}};
        const existing = await ScoreCard.findOneAndUpdate(filter, update);
        if (existing){
            res.send({message: `update (${refresh.name}, ${refresh.subject}, ${refresh.score})`});
        }
        else{
            const Card = new ScoreCard({Name: refresh.name, Subject: refresh.subject, Score: refresh.score});
            res.send({message: `add (${refresh.name}, ${refresh.subject}, ${refresh.score})`, card: Card});
            await Card.save();
        }
    }
    catch(e){
        res.json({message: "exception occurred"});
    }
});


router.get("/api/query-cards", async function(req, res){
    try{
        const request = req.query;
        if (request.type === "name"){
            const list = await ScoreCard.find({Name: request.queryString});
            let mes = [];
            if (list.length < 1){
                res.send({message: "Querytype not found!"});
            }
            else{
                for (let i = 0; i < list.length; i++){
                    mes.push(`${list[i].Name} ${list[i].Subject} ${list[i].Score}`);
                }
                console.log(mes);
                res.send({messages: mes});
            }
        }
        else if (request.type === "subject"){
            const list = await ScoreCard.find({Subject: request.queryString});
            let mes = [];
            if (list.length < 1){
                res.send({message: "Querytype not found!"});
            }
            else{
                for (let i = 0; i < list.length; i++){
                    mes.push(`${list[i].Name} ${list[i].Subject} ${list[i].Score}`);
                }
                console.log(mes);
                res.send({messages: mes});
            }
        }
    }
    catch(e){
        res.json({message: "unable to query"});
    }


});
export default router;