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
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          console.log(user);
            if(currentUser){
                let userData = {userId:'', email:'', userName: ''};

                if(user != null){
                  userData.userId = user.userId;
                  userData.email = user.email;
                  userData.userName = user.userName;
                } else {
                  userData.userId = currentUser.uid;
                  userData.email = currentUser.email;
                  userData.userName = currentUser.displayName;
                }

                setUser(userData);
                console.log('로그인 상태 :', user);
            } else {
                setUser(null);
                localStorage.clear()
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