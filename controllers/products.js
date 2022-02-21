const Product = require('../models/products')
const asyncHandler = require('../middleware/async')

//@desc Add Product
//@route POST api/product/add
//@access Private
exports.addProduct = asyncHandler(async(req, res) => {
    const product = await Product.create(req.body)
    res.status(200).json({
        result: true,
        data: product
    })
})

//@desc List Products
//@route GET api/product/list
//@access Private
exports.listProduct = asyncHandler(async(req, res) => {
    const product = await Product.find().lean()
    res.status(200).json({
        result: true,
        message: `List get successfully!`,
        data: product
    })
});

//@desc Get Specific Product
//@route GET api/product/:id
//@access Private
exports.getProductById = asyncHandler(async(req, res) => {
    const products = await Product.findById(req.params.id)
    res.status(200).json({
        result: true,
        data: products
    })
})

//@desc Edit Product
//@route GET api/product/edit/:id
//@access Private
exports.editProduct = asyncHandler(async(req, res) => {
    const body = req.body
    const product = await Product.findByIdAndUpdate({ _id: req.params.id }, body, { new: true })
    res.status(200).json({
        result: true,
        message: `Product updated successfully.`
    })
})