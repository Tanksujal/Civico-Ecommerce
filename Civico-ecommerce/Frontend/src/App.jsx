import { Route, Routes } from "react-router-dom"
import Home from "./Pages/Home"
import ShowProducts from "./Pages/ShowProducts"
import Checkout from "./Pages/Checkout"
import Login from "./Pages/User/Login"
import Register from "./Pages/User/Register"
import Publiclogin from "./private/loginPrivate"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { Getprofile } from "./redux/features/AuthSlice"
import { getAllcategory } from "./redux/features/categorySlice"
import { getallsubcategory } from "./redux/features/subcategorySlice"
import { GetCart } from "./redux/features/cartSlice"
import Dashbord from "./Pages/Admin/Dashboard"
import ManageUsers from "./Pages/Admin/ManageUsers"
import Placeorderprivate from "./private/placeorderprivate"
import Profile from "./Pages/User/Profile"
import Orders from "./Pages/User/orders"
import OrderDetails from "./Pages/User/orderDetails"
import Userdashboard from "./Pages/User/userdashboard"
import AdminOrders from "./Pages/Admin/AdminOrders"
import AdminOrderDetails from "./Pages/Admin/AdminOrderDetails"
import AdminCategoryList from "./Pages/Admin/AdminCategoryList"
import AdminCategoryAdd from "./Pages/Admin/AdminCategoryAdd"
import AdminCategoryEdit from "./Pages/Admin/AdminCategoryEdit"
import AdminSubCategoryList from "./Pages/Admin/AdminSubcategorylist"
import AdminSubCategoryAdd from "./Pages/Admin/AdminSubcategoryAdd"
import AdminSubCategoryEdit from "./Pages/Admin/AdminSubcategoryEdit"
import AdminProductList from "./Pages/Admin/AdminProductList"
import AdminProductAdd from "./Pages/Admin/AdminProductAdd"
import { getallproducts } from "./redux/features/productSlice"
import AdminProductEdit from "./Pages/Admin/AdminProductEdit"
import AdminPrivate from "./private/adminprivate"

const App = () => {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(Getprofile())
    dispatch(getAllcategory())
    dispatch(GetCart())
    dispatch(getallproducts())
  },[dispatch])
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/showproducts/category/:id" element={<ShowProducts/>} />
      <Route path="/showproducts/sub/:id" element={<ShowProducts />} />
      <Route path="/checkout" element={
          <Checkout />
        }/>
      <Route path="/login" element={
        <Publiclogin>
        <Login/>
      </Publiclogin>
      }/>
      <Route path="/registernumber" element={
        <Publiclogin>
          <Register/>
        </Publiclogin>
        }/>

        <Route path="/dashboard" element={
          <AdminPrivate>
            <Dashbord/>
          </AdminPrivate>
          }/>
        <Route path="/manageusers" element={
          <AdminPrivate>
            <ManageUsers/>
          </AdminPrivate>
          }/>
        <Route path="/orders" element={
          <AdminPrivate>
           <AdminOrders/>
          </AdminPrivate>
          
          }/>

        <Route path="/userdashboard" element={<Userdashboard/>}/>
        <Route path="/profile" element={<Profile/>} />
        <Route path="/myorders" element={<Orders/>} />
        <Route path="/orderdetails/:id" element={<OrderDetails/>}/>


        <Route path="/adminorderdetails/:id" element={
          <AdminPrivate>
            <AdminOrderDetails/>
          </AdminPrivate>
          
          }/>
        <Route path="/categories/list" element={
          <AdminPrivate>
            <AdminCategoryList/>
          </AdminPrivate>
          
          }/>
        <Route path="/categories/add" element={
          <AdminPrivate>
            <AdminCategoryAdd/>
          </AdminPrivate>
          
          }/>
        <Route path="/categories/edit/:id" element={
          <AdminPrivate>
            <AdminCategoryEdit/>
          </AdminPrivate>
          
          }/>
        <Route path="/subcategories/list" element={
          <AdminPrivate>
            <AdminSubCategoryList/>
          </AdminPrivate>
          
          }/>
        <Route path="/subcategories/add" element={
          <AdminPrivate>
            <AdminSubCategoryAdd/>
          </AdminPrivate>
          
          }/>
        <Route path="/subcategories/edit/:id" element={
          <AdminPrivate>
             <AdminSubCategoryEdit/>
          </AdminPrivate>
         
          }/>
        <Route path="/product/list" element={
          <AdminPrivate>
            <AdminProductList/>
          </AdminPrivate>
          
          }/>
        <Route path="/product/add" element={
          <AdminPrivate>
            <AdminProductAdd/>
          </AdminPrivate>
          
          }/>
        <Route path="/product/edit/:id" element={
          <AdminPrivate>
            <AdminProductEdit/>
          </AdminPrivate>
          
          }/>
    </Routes> 
  )
}

export default App