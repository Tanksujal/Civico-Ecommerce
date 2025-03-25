const mongoose = require('mongoose')

const CartItemSchema = new mongoose.Schema({
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'product',
        required:true
    },
    quantity:{
        type:Number,
        required:true,
        default:1,
        min:1
    },
    price:{
        type:Number,
        required:true
    },
    GstPrice:{
        type:Number,
        required:true
    }
})

module.exports = mongoose.model('cartitem', CartItemSchema);
