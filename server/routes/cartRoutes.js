const express = require('express')
const router = express.Router()
const {checkout, getCart, updateCart} = require('../controllers/cartController')

const {protect} = require('../middleware/authMiddleware')



router.get('/getcart', protect, getCart)
router.put('/updatecart', protect, updateCart)
router.post('/checkout', checkout )


module.exports = router