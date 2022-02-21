const Cart = require('../models/cart')
const asyncHandler = require('../middleware/async')

exports.addProductToCart = asyncHandler(async(req, res) => {
    const body = req.body
    const findProductId = await Cart.findOne({ productId: body.productId })
    console.log("Product", findProductId)
    if (findProductId != null) {
        const count = findProductId.products.count + 1
        await Cart.updateOne({ 'findProductId.products.productId': body.productId }, { $set: { 'products.count': count } }, { multi: true })
        res.status(200).json({
            result: true
        })
    } else {
        const cart = await Cart.create(body)
        res.status(200).json({
            result: true,
            data: cart
        })
    }
})