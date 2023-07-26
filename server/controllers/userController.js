const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const UserP = require('../models/userModel')

// register user
const registerUser = asyncHandler(async (req, res) => {
    const {firstName, email, password} = req.body
    const lowercaseEmail = email.toLowerCase().trimStart().trimEnd()
    if (!firstName || !email || !password) {
        res.status(400)
        console.log(req.body)
        throw new Error('Please add all fields')
    }
    // check if user exist
    const userExists = await UserP.findOne({email})
    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }
    // Hashpassword
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create User
    const user = await UserP.create({
        firstName, 
        email: lowercaseEmail, 
        password: hashedPassword
    })

    if (user){
        res.status(201).json({
            _id: user._id,
            name: user.firstName, 
            email: user.email,
            token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('invalid user data')
    }
}) 


// login user
const loginUser = asyncHandler(async (req, res) =>{
    const {password, email} = req.body
    const lowercaseEmail = email.toLowerCase().trimStart().trimEnd()
    const user = await UserP.findOne({email : lowercaseEmail})

    if (user && (await bcrypt.compare(password, user.password))) {
        const token = generateToken(user._id)
        res.json({
            firstName: user.firstName,
            lastName: user.lastName, 
            email: user.email
        })
    } else{
        res.status(400).json('Incorrect email or password')
    }
})


const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

module.exports = {
    registerUser, loginUser
}