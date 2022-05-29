const mongoose = require('mongoose')

ObjectId = mongoose.Types.ObjectId

const cartSchema = new mongoose.Schema({

    userId: {
        type: ObjectId,
        ref: "User",
        trim: true
    },
    items: [{
        productId: {
            type: ObjectId,
            ref: 'Product',
            required: true,
            trim: true
        }, 
        quantity: {
            type: Number,
            required: true,
            trim: true,
            min: 1,
        },_id:false
    }],
    totalPrice: {
        type: Number,
        required: true,
        trim: true
    }, 

    totalItems: {
        type: Number,
        required: true,
    }//comment: "Holds total number of items in the cart" ,

}, { timestamps: true })

module.exports = mongoose.model('Cart', cartSchema)