const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

const cartSchema = mongoose.Schema({
    user: {
        type: ObjectId, 
        ref: 'UserP', 
        required: true
    }, 
    cartItems: {
        type: Array
    }
}, 
{
    timestamp: true
})

module.exports = mongoose.model('Cart', cartSchema)