import express from 'express'
import post from '../models/post.js'
import moment from 'moment'

const router = express.Router()
// TODO 2-(1): create the 1st API (/api/allPosts)
router.get("/allPosts", async function(req, res){
    try{
        const Posts = await post.find().sort({timestamp: -1});
        console.log(Posts);
        if (Posts.length) {
            res.status(200).send({
            "message": "success",
            "data": [post]
            })
        }
        else {
            res.status(403).send({
            "message": "error",
            "data": null
            })
        }
    }
    catch(e){
        res.json("error");
    }
});

// TODO 3-(1): create the 2nd API (/api/postDetail)
router.get("/postDetail", )
// TODO 4-(1): create the 3rd API (/api/newPost)

// TODO 5-(1): create the 4th API (/api/post)

export default router