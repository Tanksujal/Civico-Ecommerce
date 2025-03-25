const CartModel = require('../models/Cart.Model')
const ProductModel = require('../models/Product.Model')
const OrderModel = require('../models/Order.Model')
const Placeorder = async (req, res) => {
    try {
      const userId = req.user.id;
      const {deleiveryContact,comment,sitename,paymentMethod,shippingAddress} = req.body
      console.log(req.body);
      
      // Find the cart for the user
      const cart = await CartModel.findOne({ userId }).populate("cartItems");
      if (!cart || cart.cartItems.length === 0) {
        return res.status(400).json({ message: "Cart is empty" });
      }
  
      // Create order items from cart and reduce stock
      const orderItems = [];
      for (const item of cart.cartItems) {
        const product = await ProductModel.findById(item.productId);
        
        if (!product) {
          return res.status(404).send({ message: `Product with ID ${item.productId} not found` });
        }
  
        console.log(product.stock);
        
        // Check if stock is sufficient
        if (product.stock < item.quantity) {
          return res.status(400).send({ message: `Insufficient stock for ${product.name}` });
        }
  
        // Reduce stock
        product.stock -= item.quantity;
        await product.save();
  
        orderItems.push({
          product: item.productId,
          quantity: item.quantity,
          price: item.GstPrice, // Including GST
        });
      }
  
      // Create new order
      const newOrder = new OrderModel({
        userId,
        sitename:sitename,
        orderItems,
        DeleveryContact:deleiveryContact,comment:comment,
        totalAmount: cart.totalAmount,
        paymentMethod: paymentMethod,
        shippingAddress: shippingAddress,
        status: "pending",
        paymentResult: "Pending",
      });
  
      await newOrder.save();
  
      // Clear the cart after placing the order
      await CartModel.findOneAndDelete({ userId });
  
      res.status(201).json({ message: "Order placed successfully", order: newOrder });
  
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error", error });
    }
};
const getUserOrder = async(req,res) => {
  try {
    const user = req.user
    if(!user){
      return res.status(401).send({ message: "Unauthorized" });
    }
    const orders = await OrderModel.find({ userId: user._id}).populate({
      path: 'orderItems',
      populate: {
        path: 'product',
      }
    })
    if(!orders){
      return res.status(404).send({ message: "No orders found" });
    }
    res.status(200).send({message:"order fetched succesfully.", orders });
  } catch (error) {
    console.error(error);
      return res.status(500).json({ message: "Internal Server Error", error });
  }
}
const getAllOrder = async(req,res) => {
  try {
    const user = req.user;
    if(!user){
      return res.status(401).send({ message: "Unauthorized" });
    }
    if(user.role !== "admin"){
      return res.status(403).send({ message: "Forbidden" });
    }
    const orders = await OrderModel.find({}).populate({
      path: 'orderItems',
      populate: {
        path: 'product',
      }
    }).populate('userId')
    if(!orders){
      return res.status(404).send({ message: "No orders found" });
    }
    res.status(200).send({message:"order fetched succesfully.", orders });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
}

const updateorderStatus = async(req,res) => {
  try {
    const id = req.query.id;
    const status = req.body.status;
    const user = req.user
    if(!user){
      return res.status(401).send({ message: "Unauthorized" });
    }
    if(user.role !== "admin"){
      return res.status(403).send({ message: "Forbidden" });
    }
    const orders = await OrderModel.findByIdAndUpdate(id, { status }, { new: true }).populate({
      path: 'orderItems',
      populate: {
        path: 'product',
        }
        }).populate('userId')
        if(!orders){
          return res.status(404).send({ message: "Order not found" });
        }
    return res.status(200).send({
      message: "Order status updated successfully",
      orders
    })
  } catch (error) {
    console.error(error);
      return res.status(500).json({ message: "Internal Server Error", error });
  }
}
module.exports =  {
    Placeorder,getUserOrder,getAllOrder,updateorderStatus
}