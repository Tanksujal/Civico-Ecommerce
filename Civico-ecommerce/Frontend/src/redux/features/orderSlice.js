import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const Placeorder = createAsyncThunk('order/create',async(obj)=>{
    try {
        const res = await axios.post('http://localhost:3000/order/placeorder',obj,{withCredentials:true})
        return res.data;
    } catch (error) {
        return error.response.data
    }
})
export const getUserOrder = createAsyncThunk('order/getUserOrder',async()=>{
  try {
    const res = await axios.get('http://localhost:3000/order/getUserOrder',{withCredentials:true})
    return res.data;
  } catch (error) {
    return error.response.data
  }
})
const orderSlice = createSlice({
    name: "order",
    initialState: {
        order: [],
        loading: false,
        error: null,
        message:null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
              .addCase(Placeorder.pending,(state)=>{
                state.loading = true;
                state.error = null;
                state.message = null;
              })
              .addCase(Placeorder.fulfilled,(state,action)=>{
                state.order = action.payload.order;
                state.loading = false;
                state.message = action.payload.message;
                state.error =null
              })
              .addCase(Placeorder.rejected,(state,action)=>{
                state.loading = false;
                state.error = action.payload;
                state.message = null;
              })
              .addCase(getUserOrder.pending,(state)=>{
                state.loading = true;
                state.error = null;
                state.message = null;
              })
              .addCase(getUserOrder.fulfilled,(state,action)=>{
                state.order = action.payload.orders;
                state.loading = false;
                state.message = null
              })
              .addCase(getUserOrder.rejected,(state,action)=>{
                state.loading = false;
                state.error = action.payload;
                state.message = action.payload.message
              })
    }
})

export default orderSlice.reducer