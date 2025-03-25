import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const getAllcategory = createAsyncThunk('category/getall',async()=>{
    try {
        const res = await axios.get('http://localhost:3000/category/getallcategory')
        return res.data;
    } catch (error) {
        console.log(error);
        return error.response.data
    }
})
export const adddcategory = createAsyncThunk('category/add',async(formdata)=>{
    try {
        const res = await axios.post(`http://localhost:3000/category/addcategory`,formdata,{withCredentials:true,headers:{
            "Content-Type": "multipart/form-data",
        }})
        return res.data;
    } catch (error) {
        console.error("Error in API call:", error.response?.data || error.message);
        return error.response.data;
    }
})
export const deletecategory = createAsyncThunk('category/delete',async(id)=>{
    try {
        const res = await axios.delete(`http://localhost:3000/category/deletecategory?id=${id}`,{withCredentials:true})
        return res.data;
    } catch (error) {
        console.error("Error in API call:", error.response?.data || error.message);
    }
})
export const editCategory = createAsyncThunk('category/edit',async({id,obj})=>{
    try {
        const res = await axios.put(`http://localhost:3000/category/updatecategory?id=${id}`,obj,{withCredentials:true,headers:{
            "Content-Type": "multipart/form-data",
        }})
        return res.data;
    } catch (error) {
        console.error("Error in API call:", error.response?.data || error.message);
        return error.response.data;
    }
})
const categorySlice = createSlice({
    name: 'category',
    initialState: {
        categories: [],
        loading: false,
        error: null,
        message:null
    },
    reducers: {},
    extraReducers:(builder)=>{
        builder
            .addCase(getAllcategory.pending,(state)=>{
                state.loading = true;
                state.error = null;
                state.message = null;
            })
            .addCase(getAllcategory.fulfilled,(state,action)=>{
                state.loading = false;
                state.categories = action.payload;
                state.error = null;
                state.message = action.payload.message;
            })
            .addCase(getAllcategory.rejected,(state,action)=>{
                state.loading = false;
                state.error = action.payload;
                state.message = null;
            })
            .addCase(adddcategory.pending,(state)=>{
                state.loading = true;
                state.error = null;
                state.message = null;
            })
            .addCase(adddcategory.fulfilled,(state,action)=>{
                state.loading = false;
                state.categories = action.payload;
                state.error = null;
                state.message = action.payload.message;
            })
            .addCase(adddcategory.rejected,(state,action)=>{
                state.loading = false;
                state.error = action.payload;
                state.message = null;
            })
            .addCase(deletecategory.pending,(state)=>{
                state.loading = true;
                state.error = null;
                state.message = null;
            })
            .addCase(deletecategory.fulfilled,(state,action)=>{
                state.loading = false;
                state.categories = action.payload;
                state.error = null;
                state.message = action.payload.message;
            })
            .addCase(deletecategory.rejected,(state,action)=>{
                state.loading = false;
                state.error = action.payload;
                state.message = null;
            })
            .addCase(editCategory.pending,(state)=>{
                state.loading = true;
                state.error = null;
                state.message = null;
            })
            .addCase(editCategory.fulfilled,(state,action)=>{
                state.loading = false;
                state.categories = action.payload;
                state.error = null;
                state.message = action.payload.message;
            })
            .addCase(editCategory.rejected,(state,action)=>{
                state.loading = false;
                state.error = action.payload;
                state.message = null;
            })
    }
})
export default categorySlice.reducer