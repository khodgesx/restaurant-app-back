const express = require('express')
const router = express()
const Restaurant = require('../models/restaurant')

//index
router.get('/', async (req, res)=>{
    const restaurants = await Restaurant.find()
      //instead of rendering or redirecting
     //we send a json object to the front end
     //we send the data, here it is all restaurants from our database using Restaurant.find() 
    try{
        res.send({
            success:true,
            data: restaurants
        })
        //here if there is an error we don't send bad data, we send the error and let front end know it wasn't successful
    }catch(err){
        res.send({
            success:false, 
            data:err.message
        })
    }
})

//create
router.post ('/', async (req, res)=>{
    //send back new restaurant from form info submitted on front end
    //once we update here in our database, we send to FE to update it in state as well
    //the data is not getting parsed in the request from the restaurant container 
    const newRestaurant = await Restaurant.create(req.body) 
    try{
        res.send({
            success:true,
            data: newRestaurant
        })
    }catch(err){
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
//put an object as third paramter for new set to true (otherwise it defaults to false and doesn't actually update it?)
router.put('/:id', async (req, res)=>{
    const restaurant = await Restaurant.findByIdAndUpdate(req.params.id, req.body, {new:true})
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

//delete
router.delete('/:id', async (req, res)=>{
    const restaurant = await Restaurant.findByIdAndDelete(req.params.id)
    if(!restaurant){
        throw new Error('No restaurant by that id')
    }
    //because success is that we deleted the restaurant and the data is actually deleted so data sent is null
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