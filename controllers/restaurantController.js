const express = require('express')
const router = express()
const Restaurant = require('../models/restaurant')
const User = require('../models/user')
const multer = require('multer')
const cloudinary = require('cloudinary')
const upload = multer({dest:'./uploads/'})

//index
//get eateries by user ID
router.get('/:id', async (req, res)=>{
    const userId = await User.findById(req.params.id)
    const restaurants = await Restaurant.find({user:userId})
    try{
        res.send({
            success:true,
            data: restaurants
        })
        
    }catch(err){
        res.send({
            success:false, 
            data:err.message
        })
    }
})


//create route with photo upload
router.post ('/:id', upload.single('img'), async (req, res)=>{
    try{
    const restaurantData = req.body 
    const newRestaurant = await Restaurant.create({
        name: restaurantData.name,
        cuisine: restaurantData.cuisine,
        img: restaurantData.img,
        faveDish: restaurantData.faveDish,
        notes: restaurantData.notes,
        priceLevel: restaurantData.priceLevel,
        visited: restaurantData.visited,
        user: req.params.id
        
    })
        res.send({
            success:true,
            data: newRestaurant
        })
    }catch(err){
        console.log(err)
        res.send({
            success:false,
            data:err.message
        })

    }
})

//show
router.get('/:id', async (req, res)=>{
    const restaurant = await Restaurant.findById(req.params.id)
    try{
        res.send({
            success:true,
            data: restaurant
        })

    }catch(err){
        res.send({
            success:false, 
            data:err.message
        })
    }
})

//update
router.put('/:id', async (req, res)=>{
    const restaurant = await Restaurant.findByIdAndUpdate(req.params.id, req.body, {new:true})
    console.log(req.body)
   
    try{
        res.send({
            success:true,
            data: restaurant
        })

    }catch(err){
        res.send({
            success:false, 
            data:err.message
        })
    }
})
//update photo 
router.put('/update-photo/:id', upload.single('img'), async (req, res)=>{
    try{
        const restaurant = await Restaurant.findByIdAndUpdate(req.params.id, req.body, {new:true})
        console.log(req.body)
        console.log(req.params.id)
        console.log(req.body.img)

        res.send({
            success:true,
            data: restaurant
        })

    }catch(err){
        res.send({
            success:false, 
            data:err.message
        })
    }
})

//delete
router.delete('/:id', async (req, res)=>{
    const restaurant = await Restaurant.findByIdAndDelete(req.params.id)
    if(!restaurant){
        throw new Error('No restaurant by that id')
    }
    try{
        res.send({
            success:true,
            data: restaurant
        })

    }catch(err){
        res.send({
            success:false, 
            data:err.message
        })
    }
})


module.exports = router