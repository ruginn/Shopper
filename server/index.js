const express = require('express')
const dotenv = require('dotenv').config()
const cors = require('cors')
const connectDB = require('./config/db')
const port = process.env.PORT
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)

connectDB()



const app = express()
app.use(cors())
app.use(express.json({extended: true, limit: '10000kb'}))
app.use(express.urlencoded({extended: true, limit: '10000kb'}))

app.use('/api/auth/', require('./routes/userRoutes'))

app.listen(port, () =>{
    console.log(`listening on ${port}`)
})

