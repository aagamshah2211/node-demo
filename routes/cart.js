const express = require('express')
const router = express.Router()
const { userProtect } = require('../middleware/auth')
const { addProductToCart } = require('../controllers/cart')

router.route('/add').post(userProtect, addProductToCart)

module.exports = router