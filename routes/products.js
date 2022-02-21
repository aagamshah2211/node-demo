const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/auth')
const { addProduct, listProduct, getProductById, editProduct } = require('../controllers/products')
const { isAdmin } = require('../middleware/role')

router.route('/add').post([protect, isAdmin], addProduct)
router.route('/list').get(listProduct)
router.route('/edit/:id').get([protect, isAdmin], getProductById).put([protect, isAdmin], editProduct)

module.exports = router