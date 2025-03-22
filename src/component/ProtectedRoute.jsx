import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({children}) => {

    let user=useSelector(st=>st.user.user)

    if(!user||user?.role=="USER")
        return <Navigate to="/ChekUser"/>
    return children;
    
}
 
export default ProtectedRoute;