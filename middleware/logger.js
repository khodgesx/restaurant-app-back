module.exports = (req, res, next)=>{
    console.log(`REQUEST COMING IN AT ${req.url}`)
    next()
}