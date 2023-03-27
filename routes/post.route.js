const express=require("express")
const {PostModel}=require("../model/post.model")

const postRouter=express.Router()

postRouter.post("/add",async(req,res)=>{
    try {
        const data=req.body
        const post=new PostModel(data)
        await post.save()
        res.status(200).send({msg:"Posts Added"})
    } catch (error) {
        res.status(400).send(error.message)
    }
   
})

postRouter.get("/",async(req,res)=>{
    //const user=req.body.user
    //console.log(user)
    const {page}=req.query
    let limit=3
    let skip=(+page-1)*limit
    try {
        const posts=await PostModel.find().skip(skip).limit(limit)
        res.send(posts)
    } catch (error) {
        console.log(error.message)
    }
    
})

postRouter.get("/top",async(req,res)=>{
    const {page}=req.query
    let limit=3
    let skip=(+page-1)*limit
    const posts=await PostModel.find().skip(skip).limit(limit)
    res.send(posts)
})


postRouter.patch("/update/:id",async(req,res)=>{
    let userId=req.body.user
    const id=req.params.id
    const body=req.body
    const data=await PostModel.findOne({_id:id})
    if(data.user===userId)
    {
        await PostModel.findByIdAndUpdate({_id:id},body)
        res.send({msg:"Posts updated"})
    }
    else{
        res.send({msg:"Posts not found"})
    }
})

postRouter.delete("/delete/:id",async(req,res)=>{
    let userId=req.body.user
    const id=req.params.id
    
    const data=await PostModel.findOne({_id:id})
    if(data.user===userId)
    {
        await PostModel.findByIdAndDelete({_id:id})
        res.send({msg:"Posts deleted"})
    }
    else{
        res.send({msg:"Posts not found"})
    }
})




module.exports={postRouter}