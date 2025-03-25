import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'


export const getallorder = createAsyncThunk('admin/getallorder',async()=>{
    try {
        const res = await axios.get('http://localhost:3000/order/getAllOrder',{withCredentials:true})
        return res.data
    } catch (error) {
        console.log(error)
        return error.response.data
    }
})

export const updatestatusorder = createAsyncThunk('addmin/updatestatus',async({id,status})=>{
  try {
    const res = await axios.put(`http://localhost:3000/order/updateorderStatus?id=${id}`,{status},{withCredentials:true})
    return res.data
  } catch (error) {
    console.log(error)
        return error.response.data
  }
})
const adminOrderSlice = createSlice({
    name: 'adminUser',
    initialState: {
        orders:[],
        loading:false,
        error:null,
        message:null,
    },
    reducers:{},
    extraReducers: (builder) => {
        builder
              .addCase(getallorder.pending,(state)=>{
                state.loading = true
                state.error = null,
                state.message = null
              })
              .addCase(getallorder.fulfilled,(state,action)=>{
                state.loading = false
                state.orders = action.payload.orders
                state.error = null
                state.message = action.payload.message
              })
              .addCase(getallorder.rejected,(state,action)=>{
                state.loading = false
                state.error = action.error.message
                state.error = action.payload.error
              })
    }
})

export default adminOrderSlice.reducer