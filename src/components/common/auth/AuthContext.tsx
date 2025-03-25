import { auth } from "@/config/firebaseConfig";
import { userState } from "@/recoil/atoms/userState";
import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect } from "react";
import { useRecoilState } from "recoil";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useRecoilState(userState)
      
    useEffect(() => {
          // Fetch user data and set it in Recoil state
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if(user){
                const userData = {
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName
                };
                setUser(userData);
                console.log('로그인 상태 :', user);
            } else {
                setUser(null);
                localStorage.setItem('token', null);
                console.log('로그아웃 상태');
            }
        });
  
        return () => unsubscribe();
    }, []);
  

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};