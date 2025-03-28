import { useAuth } from "./AuthProvider";
import { Navigate } from "react-router-dom";

const AuthRoute = ({ children }) => {
    const { user, loginUser } = useAuth();

    if(loginUser.contents){
        if(loginUser.state === 'hasValue'){
            return children;
        }
    } else {
        return user ? children : <Navigate to="/sign-in" />;
    }
};
  
export default AuthRoute;
  