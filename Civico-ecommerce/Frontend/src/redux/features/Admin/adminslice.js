import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAdmin = createAsyncThunk("admin/fetchAdmin", async (_, thunkAPI) => {
  try {
    const res = await axios.get("http://localhost:3000/admin/getadmin",{withCredentials:true}); // Your admin API endpoint
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const adminSlice = createSlice({
    name: "admin",
    initialState: {
      admin: null,
      loading: false,
      error: null,
    },
    reducers: {
      logoutAdmin: (state) => {
        state.admin = null;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchAdmin.pending, (state) => {
          state.loading = true; // ✅ Set loading while fetching
        })
        .addCase(fetchAdmin.fulfilled, (state, action) => {
          state.admin = action.payload.user;
          state.loading = false;
        })
        .addCase(fetchAdmin.rejected, (state) => {
          state.admin = null;
          state.loading = false;
        });
    },
  });
  

export const { logoutAdmin } = adminSlice.actions;
export default adminSlice.reducer;
