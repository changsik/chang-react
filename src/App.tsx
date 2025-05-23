import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import MainPage from "@pages/index/index"
import BookmarkPage from "@/pages/bookmark/index"
import FirebaseAuth from "@/pages/auth/FirebaseAuth"
import SendbirdBasic from "./pages/chat/SendbirdBasic"
import SendbirdUser from "./pages/chat/SendbirdUser"
import SendbirdChat from "./pages/chat/SendbirdChat"
import SignIn from "./pages/auth/SignIn"
import { AuthProvider } from "./components/common/route/AuthProvider"
import AuthRoute from "./components/common/route/AuthRoute"
import SendbirdProv from "./pages/chat/SendbirdProv"
import SendbirdChat2 from "./pages/chat/SendbirdChat2"
import Chat from "./pages/chat/Chat"
import ChatChannel from "./pages/chat/ChatChannel"
import { RecoilRoot } from "recoil"
import PublicRoute from "./components/common/route/PublicRoute"
import SignUp from "./pages/auth/SignUp"
import CommonHeader from "./components/common/header/CommonHeader"
import React from "react"
import Loading from "./pages/index/components/Loading"

const MainApp = () => {
    const location = useLocation()
    const noHeaderRoutes = ['/sign-in']

    return (     
        <div>
            { !noHeaderRoutes.includes(location.pathname) && (<><CommonHeader/></>)}
            <Routes>
                <Route index path="/" element={<AuthRoute><MainPage/></AuthRoute>}></Route>
                <Route path="/search/:id" element={<AuthRoute><MainPage/></AuthRoute>}></Route>
                <Route path="/bookmark" element={<AuthRoute><BookmarkPage/></AuthRoute>}></Route>
                <Route path="/chat" element={<AuthRoute><Chat/></AuthRoute>}></Route>
                <Route path="/chat/channel" element={<ChatChannel/>}></Route>
                <Route path="/firebase" element={<PublicRoute><FirebaseAuth/></PublicRoute>}></Route>
                <Route path="/sendbird" element={<SendbirdBasic/>}></Route>
                <Route path="/sendbird/user" element={<SendbirdUser/>}></Route>
                <Route path="/sendbird/chat" element={<SendbirdChat/>}></Route>
                <Route path="/sendbird/chat2" element={<SendbirdChat2/>}></Route>
                <Route path="/sendbird/prov" element={<SendbirdProv/>}></Route>
                <Route path="/sign-in" element={<PublicRoute><SignIn/></PublicRoute>}></Route>
                <Route path="/sign-up" element={<PublicRoute><SignUp/></PublicRoute>}></Route>
            </Routes>
        </div>
    )
}

const App = () => {
    return (
        <RecoilRoot>
            {/* <React.Suspense fallback={<Loading />}> */}
                <BrowserRouter>
                    <AuthProvider>
                        <MainApp />
                    </AuthProvider>
                </BrowserRouter>
            {/* </React.Suspense> */}
        </RecoilRoot>
    )  
}

export default App