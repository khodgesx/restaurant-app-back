module.exports = (req, res, next)=>{
    if(req.session.isLoggedIn){
        next()
    }else{
        console.log(err)
    }
}