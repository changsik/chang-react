import { useAuth } from "./AuthProvider";
import { Navigate } from "react-router-dom";

const AuthRoute = ({ children }) => {
    const { user, loginUser } = useAuth();

    // console.log('user =========', user);
    // console.log('loginUser =========', loginUser);
    // console.log('isAuthenticated =========', isAuthenticated);

    if(loginUser.contents){
        if(loginUser.state === 'hasValue'){
            return children;
        }
    } else {
        return user ? children : <Navigate to="/sign-in" />;
    }
    
    //return isAuthenticated ? children : <Navigate to="/sign-in" />
};
  
export default AuthRoute;
  