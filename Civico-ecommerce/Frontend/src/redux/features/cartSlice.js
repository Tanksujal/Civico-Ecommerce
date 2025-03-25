import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const AddCart = createAsyncThunk("cart/addcart", async ({ productId, quantity, selectedSize }) => {
    let obj = { productId, quantity, selectedSize };
    try {
        const res = await axios.post("http://localhost:3000/cart/addcart", obj, { withCredentials: true });
        return res.data;
    } catch (error) {
        return error.response?.data;
    }
});

export const GetCart = createAsyncThunk("cart/getcart", async () => {
    try {
        const res = await axios.get("http://localhost:3000/cart/getcart", { withCredentials: true });
        return res.data;
    } catch (error) {
    }
});

export const UpdateCartQuantity = createAsyncThunk("cart/updatequantity",async({productId,newQuantity,selectedSize})=>{
    let obj={productId,newQuantity,selectedSize};
    try {
        const res = await axios.put('http://localhost:3000/cart/updateCartQuantity',obj,{withCredentials:true})
        return res.data;
    } catch (error) {
    }
})
export const UpdateminQuantity = createAsyncThunk("cart/updateminquantity",async({productId,newQuantity,selectedSize})=>{
    let obj={productId,newQuantity,selectedSize};
    try {
        const res = await axios.put('http://localhost:3000/cart/updateminQuantity',obj,{withCredentials:true})
        return res.data;
    } catch (error) {
    }
})
export const deleteproductfromcart = createAsyncThunk("cart/deletecart",async(productId)=>{
    try {
        const res = await axios.delete(`http://localhost:3000/cart/deleteCartItem?id=${productId}`,{withCredentials:true})
        return res.data;
    } catch (error) {
       
    }
})
const CartSlice = createSlice({
    name: "cart",
    initialState: {
        cart: {}, 
        loading: false,
        error: null,
        message: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(AddCart.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.message = null;
            })
            .addCase(AddCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload.cart; // Store the updated cart object
                state.error = null;
                state.message = action.payload.message;
            })
            .addCase(AddCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                state.message = action.payload?.message || action.payload?.error;
            })
            .addCase(GetCart.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.message = null;
            })
            .addCase(GetCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload.cart; // Store the entire cart object
                state.error = null;
                state.message = null
            })
            .addCase(GetCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                state.message = null
            })
            .addCase(UpdateCartQuantity.pending,(state)=>{
                state.loading = true;
                state.error = null;
                state.message = null;
            })
            .addCase(UpdateCartQuantity.fulfilled,(state,action)=>{
                state.loading = false;
                state.cart = action.payload.cart;
                state.error = null;
                state.message = action.payload.message;
            })
            .addCase(UpdateCartQuantity.rejected,(state,action)=>{
                state.loading = false;
                state.error = action.error.message;
                state.message = action.payload?.message || action.payload?.error;
            })
            .addCase(UpdateminQuantity.pending,(state)=>{
                state.loading = true;
                state.error = null;
                state.message = null;
            })
            .addCase(UpdateminQuantity.fulfilled,(state,action)=>{
                state.loading = false;
                state.cart = action.payload.cart;
                state.error = null;
                state.message = action.payload.message;
            })
            .addCase(UpdateminQuantity.rejected,(state,action)=>{
                state.loading = false;
                state.error = action.error.message;
                state.message = action.payload?.message || action.payload?.error;
            })
            .addCase(deleteproductfromcart.pending,(state)=>{
                state.loading = true;
                state.error = null;
                state.message = null;
            })
            .addCase(deleteproductfromcart.fulfilled,(state,action)=>{
                state.loading = false;
                state.cart = action.payload.cart;
                state.error = null;
                state.message = action.payload.message;
            })
            .addCase(deleteproductfromcart.rejected,(state,action)=>{
                state.loading = false;
                state.error = action.error.message;
                state.message = action.payload?.message || action.payload?.error;
            })
    },
});

export default CartSlice.reducer;
