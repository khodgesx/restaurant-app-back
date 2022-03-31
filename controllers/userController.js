const express = require('express')
const router = express()
const User = require('../models/user')
const bcrypt = require('bcryptjs');
const multer = require('multer')
const cloudinary = require('cloudinary')
const upload = multer({dest:'./uploads/'})

//index
router.get('/', async (req, res)=>{
    const users = await User.find()
      //instead of rendering or redirecting
     //we send a json object to the front end
     //we send the data, here it is all users from our database using User.find() 
    try{
        res.send({
            success:true,
            data: users
        })
        //here if there is an error we don't send bad data, we send the error and let front end know it wasn't successful
    }catch(err){
        res.send({
            success:false, 
            data:err.message
        })
    }
})

//create user route with photo upload
router.post ('/', upload.single('img'), async (req, res)=>{
    try{
    //send back new restaurant from form info submitted on front end
    //once we update here in our database, we send to FE to update it in state as well
   
    const userData = req.body 
    console.log(userData)
    
    const newUser = await User.create({
        displayName: userData.displayName,
        username: userData.username,
        password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)),
        img: userData.img
    })
    console.log(newUser)
        res.send({
            success:true,
            data: newUser
        })
    }catch(err){
        res.send({
            success:false,
            data:err.message
        })

    }
})

router.post('/login', async (req, res) => {
    try {
        // Grab the user from the database with the username from the form
        const possibleUser = await User.findOne({ username: req.body.username })
        console.log(possibleUser)
        if (possibleUser) {
            // There is a user with this username!
            // Compare the password from the form with the database password
            if (bcrypt.compareSync(req.body.password, possibleUser.password)) {
                // console.log('hello')
                // // It's a match! Successful login!
                // req.session.isLoggedIn = true;
                // req.session.userId = possibleUser._id;
                // console.log(req.session.userId)
                console.log(possibleUser._id)
                // return
                res.send({
                    success:true,
                    data: possibleUser
                })
            
            }
        }
    } catch (err) {
        console.log(err);
        res.send({
            success:false,
            data:err.message
        })
    }
})
//show
router.get('/:id', async (req, res)=>{
    const user = await User.findById(req.params.id)
    try{
        res.send({
            success:true,
            data: user
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
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {new:true})
    try{
        res.send({
            success:true,
            data: user
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
    const user = await User.findByIdAndDelete(req.params.id)
    if(!user){
        throw new Error('No user by that id')
    }
    //because success is that we deleted the user and the data is actually deleted so data sent is null
    try{
        res.send({
            success:true,
            data: user
        })

    }catch(err){
        res.send({
            success:false, 
            data:err.message
        })
    }
})


module.exports = router