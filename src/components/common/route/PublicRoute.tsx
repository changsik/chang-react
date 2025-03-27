import { useAuth } from "./AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

const PublicRoute = ({ children }) => {
    const { user, loginUser } = useAuth();
    const location = useLocation()
    // console.log('location.pathname  ==== ',location.pathname)
    // console.log('user =========', user);
    // console.log('loginUser =========', loginUser);
    // console.log('isAuthenticated =========', isAuthenticated);

    if(loginUser.contents){
        if(loginUser.state === 'hasValue'){
            if(location.pathname === '/login'){
                return children
            } else if(location.pathname === '/sign-in'){
                return <Navigate to="/" />
            } else {
                return <Navigate to="/" />
            }
        }
    } else {
        if(user){
            return <Navigate to="/" />
        } else {
            if(location.pathname === '/login'){
                return <Navigate to="/sign-in" />
            } else {
                return children
            }   
        }
        
        //return user ? <Navigate to="/" /> : children;
    }
    
    // return !isAuthenticated ? children : <Navigate to="/" />
};
  
export default PublicRoute;
  