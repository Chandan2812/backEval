const express=require("express")
const {UserModel}=require("../model/user.model")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")

const userRouter=express.Router()

userRouter.post("/register",async(req,res)=>{
    const {name,email,gender,password,age,city,is_married}=req.body
    try {
        bcrypt.hash(password,5,async(err,hash)=>{
            if(err) res.send({msg:err.message})
            else{
                const user=new UserModel({name,email,gender,password:hash,age,city,is_married})
                await user.save()
                res.status(200).send({msg:"new user has been registered"})
            }
        })
    } catch (error) {
        res.status(400).send({msg:error.message})
    }
})


userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body
    try {
        const user=await UserModel.find({email})
        if(user.length>0)
        {
            bcrypt.compare(password,user[0].password,(err,result)=>{
                if(result)
                {
                    let token=jwt.sign({userID:user[0]._id},"secret")
                    res.send({msg:"logged in",token:token})
                }
                else{
                    res.send({msg:"Wrong credentials"})
                }
            })
        }
        else{
            res.send({msg:"Wrong Credentials"})
        }
    } catch (error) {
        res.send(error.message)
    }
})


module.exports={userRouter}