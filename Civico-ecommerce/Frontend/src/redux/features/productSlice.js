import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getallproductBysubcategory = createAsyncThunk('product/getallproductBysubcategory',async(id,{rejectWithValue})=>{
    try {
        const res = await axios.get(`http://localhost:3000/product/getallproductBysubcategory?id=${id}`,{withCredentials:true})
        return res.data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
})


export const getallproducts = createAsyncThunk('get/allproducts',async()=>{
  try {
    const res = await axios.get('http://localhost:3000/product/getallproducts',{withCredentials:true})
    return res.data;
  } catch (error) {
    console.log(error);
    return (error);
  }
})

export const addProducts = createAsyncThunk('product/addproduct',async(obj)=>{
  console.log(obj);
  
  try {
    const res = await axios.post(`http://localhost:3000/product/addproduct`,obj,{withCredentials:true,
      headers:{
        "Content-Type": "multipart/form-data",
      }
    })
    return res.data;
  } catch (error) {
    console.log(error);
    
    return error.response.message;
  }
})
export const deleteproduct = createAsyncThunk('product/delete',async(id)=>{
  try {
      const res = await axios.delete(`http://localhost:3000/product/deleteproduct?id=${id}`,{withCredentials:true})
      return res.data;
  } catch (error) {
      console.error("Error in API call:", error.response?.data || error.message);
  }
})
export const editproduct = createAsyncThunk('product/edit',async({id,obj})=>{
  try {
      const res = await axios.put(`http://localhost:3000/product/updateproduct?id=${id}`,obj,{withCredentials:true,headers:{
          "Content-Type": "multipart/form-data",
      }})
      return res.data;
  } catch (error) {
      console.error("Error in API call:", error.response?.data || error.message);
      return error.response.data;
  }
})

const ProductSlice = createSlice({
    name: 'product',
    initialState: {
        products: [],
        loading: false,
        error: null,
        message:null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
              .addCase(getallproductBysubcategory.pending,(state)=>{
                state.loading = true;
                state.error = null;
              })
              .addCase(getallproductBysubcategory.fulfilled,(state,action)=>{
                state.loading = false;
                state.products = action.payload;
                state.error = null,
                state.message = action.payload.message
              })
              .addCase(getallproductBysubcategory.rejected,(state,action)=>{
                state.loading = false;
                state.error = action.payload;
                state.message = action.payload?.message || "no fetching"
              })
              .addCase(getallproducts.pending,(state)=>{
                state.loading = true;
                state.error = null;
              })
              .addCase(getallproducts.fulfilled,(state,action)=>{
                state.loading = false;
                state.products = action.payload;
                state.error = null,
                state.message = action.payload.message
              })
              .addCase(getallproducts.rejected,(state,action)=>{
                console.log(action.payload);
                
                state.loading = false;
                state.error = action.payload;
                state.message = action.payload?.message 
              })
              .addCase(addProducts.pending,(state)=>{
                state.loading = true;
                state.error = null;
              })
              .addCase(addProducts.fulfilled,(state,action)=>{
                state.loading = false;
                state.products = action.payload;
                state.error = null,
                state.message = action.payload.message
              })
              .addCase(addProducts.rejected,(state,action)=>{
                console.log(action.payload);
                
                state.loading = false;
                state.error = action.payload;
                state.message = action.payload?.message 
              })
              .addCase(deleteproduct.pending,(state)=>{
                state.loading = true;
                state.error = null;
              })
              .addCase(deleteproduct.fulfilled,(state,action)=>{
                state.loading = false;
                state.products = action.payload;
                state.error = null,
                state.message = action.payload.message
              })
              .addCase(deleteproduct.rejected,(state,action)=>{
                console.log(action.payload);
                
                state.loading = false;
                state.error = action.payload;
                state.message = action.payload?.message 
              })
              .addCase(editproduct.pending,(state)=>{
                state.loading = true;
                state.error = null;
              })
              .addCase(editproduct.fulfilled,(state,action)=>{
                state.loading = false;
                state.products = action.payload;
                state.error = null,
                state.message = action.payload.message
              })
              .addCase(editproduct.rejected,(state,action)=>{
                console.log(action.payload);
                
                state.loading = false;
                state.error = action.payload;
                state.message = action.payload?.message 
              })

    }
})

export default ProductSlice.reducer