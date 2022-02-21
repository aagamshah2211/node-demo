const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    products: {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        },
        count: {
            type: Number,
            default: 1
        }
    }
}, {
    timestamps: { createdAt: 'dCreatedDate', updatedAt: 'dUpdatedDate' }
})

module.exports = mongoose.model('Cart', cartSchema)