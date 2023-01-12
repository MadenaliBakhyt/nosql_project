const router =require("express").Router()
const Product=require("../models/Product")

router.post("/createProduct",async(req,res)=>{
    const newProduct=new Product({
        name:req.body.name,
        categories:req.body.categories,
        price:req.body.price,
        description:req.body.description,
        amountLeft:req.body.amountLeft,
        rating:req.body.rating
    })
    try {
        const savedProduct=await newProduct.save()
        res.status(201).json(savedProduct)
    }catch (err){
        res.status(500).json(err)
    }
})



router.put("/:id",async (req,res)=>{

    try{
        const updatedProduct=await Product.findByIdAndUpdate(req.params.id,{
            $set: req.body
        },{new:true})
        res.status(200).json(updatedProduct)
    }catch (err){
        res.status(500).json(err)
    }
})

router.delete("/:id",async (req,res)=>{
    try{
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json("Product deleted")

    }catch (err){
        res.status(500).json(err)
    }
})

router.get("/find/:id",async (req,res)=>{
    try{
        const product = await Product.findById(req.params.id)
        res.status(200).json(product)
    }catch (err){
        res.status(500).json(err)
    }

})

router.get("/",async (req,res)=>{
    const query = req.query.new
    try{
        const products= query ? await Product.find().sort({_id:-1}).limit(5) : await Product.find()


        res.status(200).json(products)
    }catch (err){
        res.status(500).json(err)
    }

})
module.exports=router