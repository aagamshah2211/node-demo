const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String
    },
    price: {
        type: Number
    }
}, { timestamps: { createdAt: 'dCreatedDate', updatedAt: 'dUpdatedDate' } })

module.exports = mongoose.model('Product', productSchema)