const express = require('express')
const router = express.Router()
const {checkout} = require('../controllers/cartController')

const {protect} = require('../middleware/authMiddleware')

router.post('/checkout', checkout )

module.exports = router