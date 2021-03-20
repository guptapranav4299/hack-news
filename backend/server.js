const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
require('dotenv').config()
const mongoose = require('mongoose')
// bring routes
const newsRoutes = require('./routes/news')
const authRoutes = require('./routes/auth')


const app =express()

// db connect
mongoose.connect(process.env.MONGO_URI,{ useNewUrlParser: true, useCreateIndex:true , useFindAndModify : false }).then(() =>{
    console.log(`DB connected`);
})

// middlewares
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser())

// routes middlewares
app.use('/api',newsRoutes)
app.use('/api',authRoutes)


// CORS
if(process.env.NODE_ENV === 'development'){
    app.use(cors({ origin: `${process.env.CLIENT_URL}`}))
}



// routes

app.get('/api',(req,res) =>{
    res.json({ time: Date().toString() })
})




// port

const port = process.env.PORT || 8000

app.listen(port,() =>{
    console.log(`Server is running on ${port}`);
})

