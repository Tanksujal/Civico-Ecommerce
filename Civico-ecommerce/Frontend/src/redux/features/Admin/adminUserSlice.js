import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'


export const getalluser = createAsyncThunk('admin/getalluser',async()=>{
    try {
        const res = await axios.get('http://localhost:3000/admin/getAlluser',{withCredentials:true})
        return res.data
    } catch (error) {
        console.log(error)
        return error.response.data
    }
})
const adminUserSlice = createSlice({
    name: 'adminUser',
    initialState: {
        users:[],
        loading:false,
        error:null,
        message:null,
    },
    reducers:{},
    extraReducers: (builder) => {
        builder
              .addCase(getalluser.pending,(state)=>{
                state.loading = true
                state.error = null,
                state.message = null
              })
              .addCase(getalluser.fulfilled,(state,action)=>{
                state.loading = false
                state.users = action.payload.users
                state.error = null
                state.message = action.payload.message
              })
              .addCase(getalluser.rejected,(state,action)=>{
                state.loading = false
                state.error = action.error.message
                state.error = action.payload.error
              })
    }
})

export default adminUserSlice.reducer