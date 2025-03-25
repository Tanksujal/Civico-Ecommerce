import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";

const Publiclogin = ({children}) => {
    const {user,message,error} = useSelector(state => state.user)
   
    
    return user ? <Navigate to="/" /> : children;
}

export default Publiclogin