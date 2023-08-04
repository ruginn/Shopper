const asyncHandler = require('express-async-handler')
const mongoose = require('mongoose')
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)
const UserP = require('../models/userModel')
const Cart = require('../models/cartModel')


// get cart -- if user logged in get cart
const getCart = asyncHandler(async(req, res) => {
    try {
        console.log(req.user)
        const userId = new mongoose.Types.ObjectId(req.user._id)
        const cartito = await Cart.findOne({user: userId})
        res.status(200).json(cartito)
    } catch (e) {
        res.status(500).json({error: e.message})
    }
    

})

// update cart--- add and delete items 
const updateCart = asyncHandler(async (req, res) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.user._id)
        const cart = await Cart.findOne({user: userId})
        console.log(req.body)
        await cart.updateOne({cartItems: req.body})
        const updatedCart = await Cart.findOne({user: userId})
        res.status(200).json(updatedCart.cartItems)
    } catch (e) {
        res.status(500).json({error: e.message})
    }
})

const storeItems = new Map([
    [1, { priceInCents: 10000, name: "Learn React Today" }],
    [2, { priceInCents: 20000, name: "Learn CSS Today" }],
  ])

// checkout with stripe
const checkout = asyncHandler(async (req, res) => {
    console.log(req.body)
    
    try {
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          mode: "payment",
          line_items: req.body.map(item => {
            const storeItem = storeItems.get(item.id)
            let cost = Math.round(item.unitCost * 100)
            return {
              price_data: {
                currency: "usd",
                product_data: {
                  name: item.name,
                },
                unit_amount: cost,
              },
              quantity: item.qtyData,
            }
          }),
          success_url: `${process.env.CLIENT_URL}/cart`,
          cancel_url: `${process.env.CLIENT_URL}/cart`,
        })
        res.send({ url: session.url })
      } catch (e) {
        res.status(500).json({ error: e.message })
      }
    })

module.exports = {
    checkout, getCart, updateCart
}