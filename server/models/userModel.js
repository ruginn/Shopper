const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    firstName: {
        type: String, 
        required: [true, 'Please add a name']
    },
    lastName: {
        type: String, 
    },
    email: {
        type: String, 
        required: [true, 'Please add a email'], 
        unquie: true, 
    }, 
    password: {
        type: String, 
        required: [true, 'Please add a password']
    }, 
    phone: {
        type: String
    }
}, 
{
    timestamp: true
})

module.exports = mongoose.model('UserP', userSchema)