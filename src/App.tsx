import { BrowserRouter, Routes, Route } from "react-router-dom"
import MainPage from "@pages/index/index"
import BookmarkPage from "@/pages/bookmark/index"
import FirebaseAuth from "@/pages/auth/FirebaseAuth"
import SendbirdBasic from "./pages/chat/SendbirdBasic"
import SendbirdUser from "./pages/chat/SendbirdUser"
import SendbirdChat from "./pages/chat/SendbirdChat"
import SignIn from "./pages/auth/SignIn"
import { useEffect } from "react"
import { auth } from "./config/firebaseConfig"
import { AuthProvider } from "./components/common/auth/AuthContext"
import ProtectedRoute from "./components/common/auth/ProtectedRoute"
import SendbirdProv from "./pages/chat/SendbirdProv"
import SendbirdChat2 from "./pages/chat/SendbirdChat2"
import Chat from "./pages/chat/Chat"
import ChatChannel from "./pages/chat/ChatChannel"

const App = () => {
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
                <Route path="/chat" element={<ProtectedRoute><Chat/></ProtectedRoute>}></Route>
                <Route path="/chat/channel" element={<ChatChannel/>}></Route>
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