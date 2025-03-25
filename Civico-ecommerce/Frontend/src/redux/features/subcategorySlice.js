import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const getallsubcategory = createAsyncThunk('subcategory/getallsubcategory',async()=>{
    try {
        const res = await axios.get('http://localhost:3000/subcategory/getallsubcategory',{withCredentials:true});
        return res.data;
    } catch (error) {
        return error.Response?.data
    }
})
export const getsubcategorybycategory = createAsyncThunk('subcategory/getsubcategorybycategory',async(id,{rejectWithValue})=>{
    try {
        const res = await axios.get(`http://localhost:3000/subcategory/subcategorfindByCategory?id=${id}`,{},{withCredentials:true})
        return res.data;
    } catch (error) { 
        return rejectWithValue(error.response?.data || { message: "Failed to fetch subcategories" });
    }
    
})


export const adddsubcategory = createAsyncThunk('subcategory/add',async(obj)=>{
  console.log(obj);
  
  try {
      const res = await axios.post(`http://localhost:3000/subcategory/addsubcategory`,obj,{withCredentials:true,headers:{
          "Content-Type": "multipart/form-data",
      }})
      return res.data;
  } catch (error) {
      console.error("Error in API call:", error.response?.data || error.message);
      return error.response.data;
  }
})
export const deletesubcategory = createAsyncThunk('subcategory/delete',async(id)=>{
  try {
      const res = await axios.delete(`http://localhost:3000/subcategory/deletesubcategory?id=${id}`,{withCredentials:true})
      return res.data;
  } catch (error) {
      console.error("Error in API call:", error.response?.data || error.message);
  }
})
export const editsubCategory = createAsyncThunk('subcategory/edit',async({id,obj})=>{
  try {
      const res = await axios.put(`http://localhost:3000/subcategory/updatesubcategory?id=${id}`,obj,{withCredentials:true,headers:{
          "Content-Type": "multipart/form-data",
      }})
      return res.data;
  } catch (error) {
      console.error("Error in API call:", error.response?.data || error.message);
      return error.response.data;
  }
})
const subcategorySlice = createSlice({
    name: 'subcategory',
    initialState: {
        subcategories: [],
        loading: false,
        error: null,
        message:null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
              .addCase(getallsubcategory.pending,(state)=>{
                state.loading = true;
                state.error = null;
                state.message = null;
              })
              .addCase(getallsubcategory.fulfilled,(state,action)=>{
                state.loading = false;
                state.error = null;
                state.message = action.payload.message;
                state.subcategories = action.payload
              })
              .addCase(getallsubcategory.rejected,(state,action)=>{
                state.loading = false;  
                state.error = action.error.message;
                state.message = action.payload.message
              })
              .addCase(getsubcategorybycategory.pending,(state)=>{
                state.loading = true;
                state.error = null;
                state.message = null;
              })
              .addCase(getsubcategorybycategory.fulfilled,(state,action)=>{
                state.loading = false;
                state.error = null;
                state.message = action.payload.message;
                state.subcategories = action.payload
              })
              .addCase(getsubcategorybycategory.rejected,(state,action)=>{
                state.loading = false;
                state.error = action.error.message;
                state.message = action.payload?.message || "Failed to fetch subcategories"
              })
              .addCase(adddsubcategory.pending,(state)=>{
                state.loading = true;
                state.error = null;
                state.message = null;
              })
              .addCase(adddsubcategory.fulfilled,(state,action)=>{
                state.loading = false;
                state.error = null;
                state.message = action.payload.message;
                state.subcategories = action.payload.subcategories
              })
              .addCase(adddsubcategory.rejected,(state,action)=>{
                state.loading = false;
                state.error = action.error.message;
                state.message = action.payload?.message || "Failed to fetch subcategories"
              })
              .addCase(deletesubcategory.pending,(state)=>{
                state.loading = true;
                state.error = null;
                state.message = null;
              })
              .addCase(deletesubcategory.fulfilled,(state,action)=>{
                state.loading = false;
                state.error = null;
                state.message = action.payload.message;
                state.subcategories = action.payload
              })
              .addCase(deletesubcategory.rejected,(state,action)=>{
                state.loading = false;
                state.error = action.error.message;
                state.message = action.payload?.message || "Failed to fetch subcategories"
              })
              .addCase(editsubCategory.pending,(state)=>{
                state.loading = true;
                state.error = null;
                state.message = null;
              })
              .addCase(editsubCategory.fulfilled,(state,action)=>{
                state.loading = false;
                state.error = null;
                state.message = action.payload.message;
                state.subcategories = action.payload
              })
              .addCase(editsubCategory.rejected,(state,action)=>{
                state.loading = false;
                state.error = action.error.message;
                state.message = action.payload?.message || "Failed to fetch subcategories"
              })
    }
})
export default subcategorySlice.reducer