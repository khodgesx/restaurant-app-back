const express = require('express');
const app = express();
const session = require('express-session');
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()
const MongoDBStore = require('connect-mongodb-session')(session);
const cloudinary = require('cloudinary').v2;

const User = require('./models/user');


const store = new MongoDBStore({
    uri: process.env.MONGO_URI,
    collection: 'mySessions'
});

require('./db-utils/connect')




const restaurantController = require('./controllers/restaurantController')
const userController = require('./controllers/userController')

app.use(express.static("public"))

app.use(require('./middleware/logger'))
const isLoggedIn = require('./middleware/isLoggedIn')

app.use(morgan('short'))
app.use(cors())
// app.use(cors({
//     origin:"https://yummy-decisions.herokuapp.com",
//     credentials: true
// }))
// const whitelist = ["https://yummy-decisions.herokuapp.com"]
// const corsOptions = {
//   origin: function (origin, callback) {
//     if (!origin || whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error("Not allowed by CORS"))
//     }
//   },
//   credentials: true,
// }
// app.use(cors(corsOptions))

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
}))

cloudinary.config({
    cloud_name: 'dmc4kghoi', 
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
app.use(async (req, res, next)=>{
    // This will send info from session to templates
    res.locals.isLoggedIn = req.session.isLoggedIn
    if(req.session.isLoggedIn){
        const currentUser = await User.findById(req.session.userId)
        res.locals.username = currentUser.username
        res.locals.userId = req.session.userId.toString()
    }
    next()
})

app.use('/restaurants', restaurantController)
app.use('/users', userController)

const port = process.env.PORT || 3001
app.listen(port, ()=>{
    console.log('app running')
})