import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { Navigate } from "react-router-dom";

const AuthRoute = ({ children }) => {
    const context = useContext<any>(AuthContext)
    if(context.loginUser.contents){
        if(context.loginUser.state === 'hasValue'){
            return children;
        }
    } else {
        return context.user ? children : <Navigate to="/sign-in" />;
    }
};
  
export default AuthRoute;
  