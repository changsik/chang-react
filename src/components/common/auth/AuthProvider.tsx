import { auth } from "@/config/firebaseConfig";
import { User, userState } from "@/recoil/atoms/userState";
import { userInfo } from "@/recoil/selectors/userSelector";
import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { useRecoilState, useRecoilValueLoadable } from "recoil";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useRecoilState(userState)
    const loginUser = useRecoilValueLoadable(userInfo)
    
    useEffect(() => {
        auth.onIdTokenChanged((user) => {
            if (user) {
                user.getIdToken().then((idToken) => {
                    localStorage.setItem('token', idToken);
                    // console.log("Updated ID Token:", idToken);
                });
            }
        });
    }, []);

    useEffect(() => {
          // Fetch user data and set it in Recoil state
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if(currentUser){
                 if(!user){
                    if(loginUser.contents){
                        loginUser.contents.then((data: User)=>{
                            setUser(data);
                        })        
                    } else {
                        setUser({
                            userId: currentUser.uid,
                            email: currentUser.email,
                            userName: currentUser.displayName,
                        });
                    }
                }
                console.log('로그인 상태 :', user);
            } else {
                setUser(null);
                localStorage.clear()
                console.log('로그아웃 상태', user);
            }
        });
  
        return () => unsubscribe();     // 구독해제
    }, [setUser]);
  
    return (
        <AuthContext.Provider value={{ user, loginUser, isAuthenticated, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)