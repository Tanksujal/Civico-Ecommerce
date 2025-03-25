const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    orderItems: [{
        product:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'product',
            required: true
        },
        quantity:{
            type: Number,
            required: true
        },
        price:{
            type: Number,
            required: true
        },
    }],
    totalAmount:{
        type: Number,
        required: true
    },
    status:{
        type: String,
        enum: ['pending', 'ready to ship', 'shipped','cancelled'],
        default: 'pending'
    },
    DeleveryContact:{
        type:String,
    },
    sitename:{
        type:String,
    },
    comment:{
        type:String,
    },
    paymentMethod:{
        type: String,
        enum:['online','COD'],
        required: true
    },
    paymentResult:{
        type: String,
    enum: ['Pending', 'Completed', 'Failed'],
    default: 'Pending'
    },
    shippingAddress:{
        address:{
            type: String,
        },
        city:{
            type: String,
        },
        postalCode:{
            type: String,
        },
        
        state:{
            type: String,
        },
    },
    deliveryDate: {
        type: Date
      },
      createdAt: {
        type: Date,
        default: Date.now
      },
      updatedAt: {
        type: Date,
        default: Date.now
      },
}) 
module.exports = mongoose.model('Order', OrderSchema);