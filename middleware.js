const jwt=require("jsonwebtoken")

const authenticate=(req,res,next)=>{
    const token=req.headers.authorization
    //console.log(token)
    if(token)
    {
        jwt.verify(token,"secret",(err,decoded)=>{
            if(decoded)
            {
                //console.log(decoded)
                req.body.user=decoded.userID
                next()
            }
            else{
                res.send({msg:"Please login"})
            }
        })
    }
    else{
        res.send({msg:"Please login"})
    }
}

module.exports={authenticate}