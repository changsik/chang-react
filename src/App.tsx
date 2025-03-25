import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom"
// import MainPage from "@pages/index"
// import AboutPage from "@pages/about"

import { RecoilRoot, useRecoilValue, useSetRecoilState } from "recoil"

import MainPage from "@pages/index/index"
import BookmarkPage from "@/pages/bookmark/index"
import FirebaseAuth from "@/pages/auth/FirebaseAuth"
import SendbirdBasic from "./pages/chat/SendbirdBasic"
import SendbirdUser from "./pages/chat/SendbirdUser"
import SendbirdChat from "./pages/chat/SendbirdChat"
import SignIn from "./pages/auth/SignIn"
import { useEffect } from "react"
import { auth } from "./config/firebaseConfig"
import { onAuthStateChanged } from "firebase/auth"
import { userState } from "./recoil/atoms/userState"
import { AuthProvider } from "./components/common/auth/AuthContext"
import ProtectedRoute from "./components/common/auth/ProtectedRoute"
import SendbirdProv from "./pages/chat/SendbirdProv"
import CustomizedApp from "./pages/chat/CustomizedApp"
import SendbirdChat2 from "./pages/chat/SendbirdChat2"

const App = () => {
    // const setUser = useSetRecoilState(userState)

    // useEffect(() => {
    //     // Fetch user data and set it in Recoil state
    //     const unsubscribe = onAuthStateChanged (auth, (user) => {
    //         if(user){
    //             setUser({
    //                 uid: user.uid,
    //                 email: user.email,
    //                 displayName: user.displayName
    //             });
    //             console.log('로그인 상태 :', user);
    //         } else {
    //             setUser(null)
    //             localStorage.setItem('token', null);
    //             console.log('로그아웃 상태');
    //             // navigate('/sign-in')
    //         }
    //     });

    //     return () => unsubscribe()
    // }, [setUser])

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

    return ( 
            <AuthProvider>
                <BrowserRouter>
                    <Routes>
                    <Route index path="/" element={<ProtectedRoute><MainPage/></ProtectedRoute>}></Route>
                    <Route path="/search/:id" element={<ProtectedRoute><MainPage/></ProtectedRoute>}></Route>
                    <Route path="/bookmark" element={<ProtectedRoute><BookmarkPage/></ProtectedRoute>}></Route>
                    <Route path="/firebase" element={<FirebaseAuth/>}></Route>
                    <Route path="/sendbird" element={<SendbirdBasic/>}></Route>
                    <Route path="/sendbird/user" element={<SendbirdUser/>}></Route>
                    <Route path="/sendbird/chat" element={<SendbirdChat/>}></Route>
                    <Route path="/sendbird/chat2" element={<SendbirdChat2/>}></Route>
                    <Route path="/sendbird/prov" element={<SendbirdProv/>}></Route>
                    <Route path="/sign-in" element={<SignIn/>}></Route>
                    </Routes>
                </BrowserRouter>
            </AuthProvider>  
            
    )
}

export default App