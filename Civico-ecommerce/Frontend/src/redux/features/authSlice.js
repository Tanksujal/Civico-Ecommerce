import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
export const sentOtp = createAsyncThunk('auth/sentOtp', async(mobileNumber,{rejectWithValue})=>{
    try {
        const res = await axios.post(`http://localhost:3000/auth/sentOtp`,{mobileNumber},{withCredentials:true})
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})
export const verifyOtpuser = createAsyncThunk('auth/verifyOtp',async({mobileNumber,otpmain},{rejectWithValue})=>{
    let obj = {
        mobileNumber,
        otp:otpmain
    }
    try {
        const res = await axios.post(`http://localhost:3000/auth/verifyOtp`,obj,{withCredentials:true})
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})
export const Getprofile = createAsyncThunk('auth/getprofile',async()=>{
    try {
        const res = await axios.get('http://localhost:3000/auth/getprofile',{withCredentials:true})
        return res.data
    } catch (error) {
        return error.response.data;
    }
})
export const RegisterUser = createAsyncThunk('auth/register',async(userdata,{rejectWithValue})=>{
    try {
        const res = await axios.post('http://localhost:3000/auth/registerUser',userdata,{withCredentials:true})
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})
export const updateUser = createAsyncThunk('auth//update',async(userdata) => {
    try {
        const res = await axios.post('http://localhost:3000/auth/updateuser',userdata,{withCredentials:true})
        return res.data
    } catch (error) {
        return error.response.data
    }
})
const authSlice = createSlice({
    name:'auth',
    initialState:{
        user:null,
        loading:false,
        error:null,
        message:null
    },
    reducers:{},
    extraReducers:(builder) =>{
        builder
             .addCase(sentOtp.fulfilled,(state,action)=>{
                state.loading = false;
                state.message = action.payload.message
             })
             .addCase(sentOtp.pending,(state)=>{
                state.loading = true;
                state.message = null
                state.error = null
             })
             .addCase(sentOtp.rejected,(state,action)=>{
                state.loading = false;
                state.error = action.payload?.message
             })
             .addCase(verifyOtpuser.pending,(state)=>{
                state.loading = true;
                state.message = null
                state.error = null
             })
             .addCase(verifyOtpuser.fulfilled,(state,action)=>{
                state.user = action.payload
                state.loading = false,
                state.message = action.payload.message
             })
             .addCase(verifyOtpuser.rejected,(state,action)=>{
                state.loading = false;
                state.error = action.payload?.message
             })
             .addCase(Getprofile.pending,(state)=>{
                state.loading = true;
                state.message = null
                state.error = null;
             })
             .addCase(Getprofile.fulfilled,(state,action)=>{
                state.user = action.payload.user,
                state.loading = false,
                state.message = action.payload.message
             })
             .addCase(Getprofile.rejected,(state,action)=>{
                state.loading = false;
                state.error = action.payload?.message
             })
             .addCase(RegisterUser.pending,(state)=>{
                state.loading = true;
                state.message = null
                state.error = null;
             })
             .addCase(RegisterUser.fulfilled,(state,action)=>{
                state.user = action.payload,
                state.loading = false,
                state.message = action.payload.message
             })
             .addCase(RegisterUser.rejected,(state,action)=>{
                state.loading = false;
                state.error = action.payload?.message
             })
             .addCase(updateUser.pending,(state)=>{
                state.loading = true;
                state.message = null
                state.error = null
             })
             .addCase(updateUser.fulfilled,(state,action)=>{
                state.user = action.payload.user,
                state.error = null,
                state.loading = false,
                state.message = action.payload.message
             })
             .addCase(updateUser.rejected,(state,action)=>{
                state.loading = false;
                state.error = action.payload?.message
             })
    }
})

export default authSlice.reducer