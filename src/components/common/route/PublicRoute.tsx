import { useAuth } from "./AuthProvider";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
    const { user, loginUser } = useAuth();

    console.log('user =========', user);
    console.log('loginUser =========', loginUser);
    // console.log('isAuthenticated =========', isAuthenticated);

    if(loginUser.contents){
        if(loginUser.state === 'hasValue'){
            //return user ? <Navigate to="/" /> : children;
            return children;
        }
    } else {
        return user ? <Navigate to="/" /> : children;
    }
    
    // return !isAuthenticated ? children : <Navigate to="/" />
};
  
export default PublicRoute;
  