const router =require("express").Router()

router.get("/usertest",(req,res)=>{
    res.send("Its goood")
})

router.post("/userpost",(req,res)=>{
    const name=req.body.username
    console.log(name)
    res.send("You username is"+name)
})


module.exports=router