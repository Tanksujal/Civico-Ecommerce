const CartModel = require("../models/Cart.Model");
const ProductModel = require("../models/Product.Model");
const CartItemsModel = require("../models/CartItems.Model");

const addcart = async (req, res) => {
  try {
    console.log(req.body);
    
    const userId = req.user.id;
    const { productId, quantity, selectedSize } = req.body;
    

    let cart = await CartModel.findOne({ userId: userId }).populate("cartItems");
    if (!cart) {
      cart = new CartModel({ userId: userId, cartItems: [] });
    }

    const product = await ProductModel.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let calculatedPrice = product.price;

    // Calculate price for SQF-based products
    if (product.unit === "sqf" && selectedSize) {
      const { width, height } = selectedSize;
      const area = width * height;
      calculatedPrice = area * product.price;
    }

    // Add 18% GST
    const gstAmount = (calculatedPrice * 18) / 100;
    const finalPrice = calculatedPrice + gstAmount;

    const existItem = cart.cartItems.find((item) => item.productId.toString() === productId);

    if (existItem) {
      existItem.quantity += quantity;
      existItem.price += calculatedPrice * quantity; // Fixed: Multiply by quantity
      existItem.GstPrice += finalPrice * quantity; // Fixed: Multiply by quantity
      await existItem.save();
    } else {
      const newCartItem = new CartItemsModel({
        productId: productId,
        quantity: quantity,
        price: calculatedPrice * quantity, // Multiply by quantity
        GstPrice: finalPrice * quantity, // Multiply by quantity
      });
      await newCartItem.save();
      cart.cartItems.push(newCartItem);
    }

    // Calculate total cart amount correctly

    cart.totalAmount = cart.cartItems.reduce((acc, item) => acc + item.GstPrice, 0);

    await cart.save();
    res.status(200).send({ message: "Product added to cart", cart: cart });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Internal Server Error",
      error,
    });
  }
};
const getCart = async(req,res) => {
    try {
        const userId = req.user.id;
        
        
        if(!userId){
            return res.status(401).send({message: "Unauthorized"});
        }
        const cart = await CartModel.find({userId}).populate({
            path:"cartItems",
            populate:{
                path:"productId",
            }
        });
        if (!cart) {
            return res.status(404).send({ message: "Cart not found" });
        }
        res.status(200).send({message:"cart fetched succsfully",cart});
    } catch (error) {
        console.log(error);
        
    }
}
const deleteCartItem = async (req, res) => {
    try {
      const userId = req.user.id;
      const  productId  = req.query.id;
  
      let cart = await CartModel.findOne({ userId }).populate("cartItems");
      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }
  
      // Find the item to remove
      const itemIndex = cart.cartItems.findIndex(item => item.productId.toString() === productId);
      if (itemIndex === -1) {
        return res.status(404).json({ message: "Item not found in cart" });
      }
  
      // Remove the item
      const removedItem = cart.cartItems.splice(itemIndex, 1)[0];
      await CartItemsModel.findByIdAndDelete(removedItem._id);
  
      // Recalculate totalAmount
      cart.totalAmount = cart.cartItems.reduce((acc, item) => acc + item.GstPrice, 0);
  
      await cart.save();
      res.status(200).json({ message: "Item removed from cart", cart });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error", error });
    }
};
const updateQuantity = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, newQuantity, selectedSize } = req.body;

    if (newQuantity <= 0) {
      return res.status(400).json({ message: "Quantity must be at least 1" });
    }

    // Find the user's cart
    let cart = await CartModel.findOne({ userId }).populate("cartItems");

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const cartItem = cart.cartItems.find(
      (item) => item.productId.toString() === productId
    );

    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    // Get product details
    const product = await ProductModel.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let calculatedPrice = product.price;

    // Calculate price for SQF-based products
    if (product.unit === "sqf" && selectedSize) {
      const { width, height } = selectedSize;
      const area = width * height;
      calculatedPrice = area * product.price;
    }

    // Add 18% GST
    const gstAmount = (calculatedPrice * 18) / 100;
    const finalPrice = calculatedPrice + gstAmount;

    // Update the cart item with new quantity and recalculated price
    cartItem.quantity = cartItem.quantity += newQuantity;
    cartItem.price = calculatedPrice * cartItem.quantity;
    cartItem.GstPrice = finalPrice * cartItem.quantity;

    await cartItem.save();

    // Recalculate total cart amount
    cart.totalAmount = cart.cartItems.reduce(
      (acc, item) => acc + item.GstPrice,
      0
    );

    await cart.save();

    res.status(200).json({
      message: "Cart item updated successfully",
      cart,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
      error,
    });
  }
};
const updateminQuantity = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, newQuantity, selectedSize } = req.body;

    if (newQuantity <= 0) {
      return res.status(400).json({ message: "Quantity must be at least 1" });
    }

    // Find the user's cart
    let cart = await CartModel.findOne({ userId }).populate("cartItems");

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const cartItem = cart.cartItems.find(
      (item) => item.productId.toString() === productId
    );

    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    // Get product details
    const product = await ProductModel.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let calculatedPrice = product.price;

    // Calculate price for SQF-based products
    if (product.unit === "sqf" && selectedSize) {
      const { width, height } = selectedSize;
      const area = width * height;
      calculatedPrice = area * product.price;
    }

    // Add 18% GST
    const gstAmount = (calculatedPrice * 18) / 100;
    const finalPrice = calculatedPrice + gstAmount;

    // Update the cart item with new quantity and recalculated price
    cartItem.quantity = cartItem.quantity -= newQuantity;
    cartItem.price = calculatedPrice * cartItem.quantity;
    cartItem.GstPrice = finalPrice * cartItem.quantity;

    await cartItem.save();

    // Recalculate total cart amount
    cart.totalAmount = cart.cartItems.reduce(
      (acc, item) => acc + item.GstPrice,
      0
    );

    await cart.save();

    res.status(200).json({
      message: "Cart item updated successfully",
      cart,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
      error,
    });
  }
};

module.exports = { addcart,getCart,deleteCartItem,updateQuantity,updateminQuantity };
