import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

const Placeorderprivate = ({children}) => {
  const { cart, message, loading, error } = useSelector((state) => state.cart)
  console.log(cart);
  



  return cart?.length > 0 ? children : <Navigate to={'/'} />
}

export default Placeorderprivate