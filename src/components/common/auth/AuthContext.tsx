import { auth } from "@/config/firebaseConfig";
import { userState } from "@/recoil/atoms/userState";
import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect } from "react";
import { useRecoilState } from "recoil";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useRecoilState(userState)
    
    useEffect(() => {
        auth.onIdTokenChanged((user) => {
            if (user) {
                user.getIdToken().then((idToken) => {
                    localStorage.setItem('token', idToken);
                    console.log("Updated ID Token:", idToken);
                });
            }
        });
    }, []);

    useEffect(() => {
          // Fetch user data and set it in Recoil state
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          console.log(user);
            if(currentUser){
                setUser({
                    userId: currentUser.uid,
                    email: currentUser.email,
                    userName: currentUser.displayName,
                });
                console.log('로그인 상태 :', user);
            } else {
                setUser(null);
                localStorage.clear()
                console.log('로그아웃 상태');
            }
        });
  
        return () => unsubscribe();     // 구독해제
    }, [setUser]);
  

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};