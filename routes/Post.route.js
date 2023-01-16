const express = require("express");
const { PostModel } = require("../models/Post.model");

const postRouter = express.Router();

postRouter.get("/", async (req, res) => {
  const query = req.query;
  try {
    const posts = await PostModel.find(query);
    res.send(posts);
  } catch (err) {
    console.log(err);
    res.send("err:--", err);
  }
});

postRouter.patch("/update/:id",async(req,res)=>{
    try{
        let postID=req.params.id;
        let post=await PostModel.findOne({_id:postID});
        if(req.body.userID===post.userID){
            let updates=req.body;
            await PostModel.findByIdAndUpdate({_id:postID},updates);
            res.send("Post updated");
        } else {
            res.send("this post is not your's , can't be updated");
        }
    } catch(err){
        console.log(err);
        res.send("something went wrong in updating post");
    }
});

postRouter.delete("/delete/:id",async(req,res)=>{
    try{
        let postID=req.params.id;
        let post=await PostModel.findOne({_id:postID});
        if(req.body.userID===post.userID){
            await PostModel.findByIdAndDelete({_id:postID});
            res.send("Post Deleted");
        } else {
            res.send("this post is not your's , can't be deleted");
        }
    } catch(err){
        console.log(err);
        res.send("something went wrong in deleting post");
    }
});

module.exports = { postRouter };
