import { auth } from "@/config/firebaseConfig";
import { sendbird } from "@/config/sendbirdConfig";
import { User, userState } from "@/recoil/atoms/userState";
import { userInfo } from "@/recoil/selectors/userSelector";
import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValueLoadable } from "recoil";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    // const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useRecoilState(userState)
    const loginUser = useRecoilValueLoadable(userInfo)
    const location = useLocation()
    const navigate = useNavigate()
    // const login = () => setIsAuthenticated(true);
    // const logout = () => setIsAuthenticated(false);

    
    useEffect(() => {
        auth.onIdTokenChanged((user) => {
            if (user) {
                user.getIdToken().then((idToken) => {
                    localStorage.setItem('token', idToken);
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
                        //console.log('loginUser.contents = ', loginUser.contents)
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
                //login();
            } else {
                console.log('로그아웃 상태', user);
                setUser(null);
                localStorage.clear()
                sendbird.disconnect(()=>{
                    console.log('Disconnected from Sendbird');
                });
                // 팝업창 한꺼번에 전부 닫기
                navigate('/sign-in?action=')
                //logout()
            }
        });
  
        return () => unsubscribe();
    }, [setUser]);
  
    return (
        <AuthContext.Provider value={{ user, loginUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)