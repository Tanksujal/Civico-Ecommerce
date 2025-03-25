import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../redux/features/authSlice'
import categoryReducer from '../redux/features/categorySlice'
import subcategoryReducer from '../redux/features/subcategorySlice'
import productReducer from '../redux/features/productSlice'
import cartSlice from '../redux/features/cartSlice'
import adminuserReducer from '../redux/features/Admin/adminUserSlice'
import orderSlice from '../redux/features/orderSlice'
import productcateSlice from '../redux/features/productcateSlice'
import adminOrderSlice from '../redux/features/Admin/adminorder.slice'
import adminslice from '../redux/features/Admin/adminslice'
export const store = configureStore({
    reducer:{
        user:authReducer,
        category:categoryReducer,
        subcategory:subcategoryReducer,
        product:productReducer,
        cart:cartSlice,
        adminuser:adminuserReducer,
        order:orderSlice,
        productCategory : productcateSlice,
        adminOrders : adminOrderSlice,
        admin:adminslice
    }
})