const asyncHandler = require('express-async-handler')
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)


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
    checkout,
}