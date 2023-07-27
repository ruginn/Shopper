const asyncHandler = require('express-async-handler')
const mongoose = require('mongoose')
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)
const UserP = require('../models/userModel')
const Cart = require('../models/cartModel')


// get cart -- if user logged in get cart
const getCart = asyncHandler(async(req, res) => {
    try {
        console.log(req.user)
        const userId = new mongoose.Types.ObjectId(req.user._id)
        const cartito = await Cart.find({user: userId})
        console.log(cartito)
        res.status(200).json(req.user)
    } catch (e) {
        res.status(500).json({error: e.message})
    }
    

})

// update cart--- add and delete items 
const updateCart = asyncHandler(async (req, res) => {
    
})



// checkout with stripe
const checkout = asyncHandler(async (req, res) => {
    console.log(req.body)
    try{
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            // line_items: req.body.map((element) => {
            //     return {
            //         price_data: {
            //             currency: 'usd', 
            //             product_data: {
            //                 name: element.name
            //             }, 
            //             unit_amount: element.unitCost
            //         }, 
            //         quantity: element.qtyData
            //     }
            // }), 
            line_items: {
                price_data: {
                    currency: 'usd', 
                    product_data: {
                        name:'jesf'
                    }, 
                    unit_amount: 1.99
                },
                quantity: 3
            },
            mode: 'payment', 
            success_url: `${process.env.CLIENT_URL}/success.html`,
            cancel_url: `${process.env.CLIENT_URL}/cancel.html`
        })
        console.log(session.line_items)
        res.json({url: session.url})
    } catch (e){
        res.status(500).json({error: e.message})

    }
})

module.exports = {
    checkout, getCart, updateCart
}