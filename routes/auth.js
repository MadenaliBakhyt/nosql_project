const router =require("express").Router()
const User=require("../models/User")
const CryptoJS=require("crypto-js")
const jwt =require("jsonwebtoken")
const {verifyToken,verifyTokenAndAuthorization} = require("./verifyToken");


router.post("/register",async(req,res)=>{
    const newUser=new User({
        name:req.body.name,
        surname:req.body.surname,
        password:CryptoJS.AES.encrypt(req.body.password,process.env.PASS_SEC),
        number:req.body.number,
        email:req.body.email,
        gender:req.body.gender

    })
    try {
        const savedUser=await newUser.save()
        res.status(201).json(savedUser)
    }catch (err){
        res.status(500).json(err)
    }
})

router.post("/login",async (req,res)=>{
    try{
        const user =await User.findOne({email:req.body.email})
        !user && res.status(401).json("Wrong email")

        const hashpassword=CryptoJS.AES.decrypt(
            user.password,
            process.env.PASS_SEC)
        const Opassword=hashpassword.toString(CryptoJS.enc.Utf8)

        Opassword !== req.body.password &&
        res.status(401).json("Wrong password")
        const accessToken=jwt.sign({
            id:user._id,
            isAdmin:user.isAdmin,
        }, process.env.JWT_SEC,{expiresIn:"3d"})
        const {password,...others}=user._doc

        res.status(200).json({...others,accessToken})
    }catch (err){
        res.status(500).json(err)
    }

})
//

module.exports=router