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
    try{
        res.send({
            success:true,
            data: users
        })
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
        const possibleUser = await User.findOne({ username: req.body.username })
        console.log(possibleUser)
        if (possibleUser) {
            if (bcrypt.compareSync(req.body.password, possibleUser.password)) {
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

//update photo 
router.put('/update-photo/:id', upload.single('img'), async (req, res)=>{
    try{
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new:true})
        console.log(req.body)
        console.log(req.params.id)
        console.log(req.body.img)

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