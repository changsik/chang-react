import { BrowserRouter, Routes, Route } from "react-router-dom"
// import MainPage from "@pages/index"
// import AboutPage from "@pages/about"

import { RecoilRoot } from "recoil"

import MainPage from "@pages/index/index"
import BookmarkPage from "@/pages/bookmark/index"
import FirebaseAuth from "@/pages/auth/FirebaseAuth"
import SendbirdBasic from "./pages/chat/SendbirdBasic"
import SendbirdUser from "./pages/chat/SendbirdUser"
import SendbirdChat from "./pages/chat/SendbirdChat"

function App() {
  // return  <BrowserRouter>
  //   <Routes>
  //     <Route index path="/" element={<MainPage/>}></Route>
  //     <Route index path="/about" element={<AboutPage/>}></Route>
  //   </Routes>
  // </BrowserRouter>
  return ( 
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<MainPage/>}></Route>
          <Route path="/search/:id" element={<MainPage/>}></Route>
          <Route path="/bookmark" element={<BookmarkPage/>}></Route>
          <Route path="/firebase" element={<FirebaseAuth/>}></Route>
          <Route path="/sendbird" element={<SendbirdBasic/>}></Route>
          <Route path="/sendbird/user" element={<SendbirdUser/>}></Route>
          <Route path="/sendbird/chat" element={<SendbirdChat/>}></Route>
        </Routes>
      </BrowserRouter>    
    </RecoilRoot>
  )
}

export default App