import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { Navigate } from "react-router-dom";

const AuthRoute = ({ children }) => {
    const context = useContext<any>(AuthContext)
    return context.user ? children : <Navigate to="/sign-in" />;
};
  
export default AuthRoute;
  