const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const connectDB = require('./config/db')

dotenv.config()
connectDB()




const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: false}))

const port = process.env.PORT

app.listen(port, () =>{
    console.log(`listening on ${port}`)
})

