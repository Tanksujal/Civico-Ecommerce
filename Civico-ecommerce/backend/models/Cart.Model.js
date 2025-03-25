const mongoose = require('mongoose')
const CartSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    cartItems:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'cartitem',
        required:true
    }],
    totalAmount:{
        type:Number,
        required:true,
        default:0,
    },
   
},{timestamps:true})
CartSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});
module.exports = mongoose.model('cart', CartSchema);
