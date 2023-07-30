const express = require('express')
const dotenv = require('dotenv').config()
const cors = require('cors')
const connectDB = require('./config/db')
const port = process.env.PORT

connectDB()



const app = express()
app.use(cors())
app.use(express.static('public'))

  
app.use(express.json({extended: true, limit: '10000kb'}))
app.use(express.urlencoded({extended: true, limit: '10000kb'}))

app.use('/api/auth/', require('./routes/userRoutes'))
app.use('/api/cart/', require('./routes/cartRoutes'))

app.listen(port, () =>{
    console.log(`listening on ${port}`)
})

