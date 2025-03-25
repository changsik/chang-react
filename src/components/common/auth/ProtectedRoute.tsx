import { useContext, useState } from "react";
import { AuthContext } from "./AuthContext";
import { Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "@/recoil/atoms/userState";

const ProtectedRoute = ({ children }) => {
    const currentUser = useRecoilValue(userState);
    //const {currentUser} = useContext(AuthContext)

    console.log('children = ', children);
    console.log('currentUSer = ', currentUser);
    return currentUser ? children : <Navigate to="/sign-in" />;
};
  
export default ProtectedRoute;
  