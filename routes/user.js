const router =require("express").Router()
const User=require("../models/User")
const CryptoJS=require("crypto-js")


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

        const {password,...others}=user._doc

        res.status(200).json(others)
    }catch (err){
        res.status(500).json(err)
    }

    })
//

router.put("/:id",async (req,res)=>{
    if (req.body.password){
        req.body.password=CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASS_SEC
        ).toString();
    }

    try{
        const updatedUser=await User.findByIdAndUpdate(req.params.id,{
            $set: req.body
        },{new:true})
        res.status(200).json(updatedUser)
    }catch (err){
        res.status(500).json(err)
    }
})

router.delete("/:id",async (req,res)=>{
    try{
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("User deleted")

    }catch (err){
        res.status(500).json(err)
    }
})

router.get("/find/:id",async (req,res)=>{
    try{
        const user = await User.findById(req.params.id)
        const {password,...others}=user._doc
        res.status(200).json(others)
    }catch (err){
        res.status(500).json(err)
    }

})

router.get("/",async (req,res)=>{
    const query = req.query.new
    try{
        const users= query ? await User.find().sort({_id:-1}).limit(5) : await User.find()


        res.status(200).json(users)
    }catch (err){
        res.status(500).json(err)
    }

})
module.exports=router