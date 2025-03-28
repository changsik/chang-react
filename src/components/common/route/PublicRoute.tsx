import { useAuth } from "./AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

const PublicRoute = ({ children }) => {
    const { user, loginUser } = useAuth();
    const location = useLocation()

    if(loginUser.contents){
        if(loginUser.state === 'hasValue'){
            if(location.pathname === '/sign-in' && location.search){
                return children
            } else {
                return <Navigate to="/" />
            }
        }
    } else {
        return user ? <Navigate to="/" /> : children 
    }
};
  
export default PublicRoute;
  